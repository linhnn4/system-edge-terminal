// @ts-nocheck
/**
 * Local cTrader Open API proxy server.
 *
 * Handles OAuth token exchange and proxies cTrader API calls.
 * Keeps client_secret on the server side — never exposed to frontend.
 *
 * Usage:  node server/ctrader-server.js
 * Env:    Reads from ../.env.ctrader
 */

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.ctrader from server directory
dotenv.config({ path: path.join(__dirname, ".env.ctrader") });

// --------------- Config ---------------
const PORT = process.env.CTRADER_SERVER_PORT || 3001;
const CLIENT_ID = process.env.CTRADER_CLIENT_ID;
const CLIENT_SECRET = process.env.CTRADER_CLIENT_SECRET;
const CTRADER_TOKEN_URL = "https://openapi.ctrader.com/apps/token";
const CTRADER_ACCOUNTS_URL = "https://api.spotware.com/connect/tradingaccounts";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "❌  CTRADER_CLIENT_ID and CTRADER_CLIENT_SECRET must be set in server/.env.ctrader",
  );
  process.exit(1);
}

// --------------- Helpers ---------------

/** Normalize a raw Spotware account object into a consistent shape. */
const normalizeAccount = (raw) => {
  const accountId = raw.accountId ?? raw.ctidTraderAccountId ?? raw.account_id;
  const accountNumber = raw.accountNumber ?? raw.login;
  const brokerName = raw.brokerName ?? raw.broker ?? "Unknown";
  const brokerTitle = raw.brokerTitle ?? raw.brokerDisplayName ?? "";
  const displayName =
    raw.displayName || raw.accountNickname || raw.nickname || raw.name || "";
  const accountType = raw.accountType || raw.type || "";

  let isLive = !!raw.live;
  let isDemo = !!raw.demo;
  const lowered = String(accountType).toLowerCase();
  if (lowered.includes("live")) isLive = true;
  if (lowered.includes("demo")) isDemo = true;
  if (raw.isLive === true) isLive = true;
  if (raw.isDemo === true) isDemo = true;

  let balance = raw.balance;
  try {
    balance = balance != null ? Number(balance) : null;
  } catch {
    balance = null;
  }

  return {
    account_id: String(accountId ?? ""),
    account_number: accountNumber != null ? Number(accountNumber) : null,
    account_name:
      displayName ||
      `Account ${raw.traderLogin || accountNumber || accountId || ""}`,
    broker: brokerName,
    broker_title: brokerTitle,
    currency: raw.depositCurrency || raw.currency || "USD",
    balance: balance ?? 0,
    is_live: isLive,
    is_demo: isDemo,
    account_type: accountType ? String(accountType) : null,
    leverage: raw.leverage ?? raw.leverageInCents ?? null,
    money_digits: raw.moneyDigits ?? null,
    trader_login: raw.traderLogin ?? null,
  };
};

/** Parse Spotware accounts response (handles { data }, { accounts }, or array). */
const parseAccountsList = (raw) => {
  let items = [];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === "object") {
    if (Array.isArray(raw.data)) items = raw.data;
    else if (Array.isArray(raw.accounts)) items = raw.accounts;
  }
  return items.filter((x) => x && typeof x === "object").map(normalizeAccount);
};

/** Fetch trading accounts from Spotware API. */
const fetchTradingAccounts = async (accessToken) => {
  try {
    const res = await fetch(
      `${CTRADER_ACCOUNTS_URL}?oauth_token=${accessToken}`,
    );
    if (!res.ok) {
      console.error("❌ Accounts fetch failed:", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    console.log("📦 Accounts response:", JSON.stringify(data).slice(0, 500));
    return parseAccountsList(data);
  } catch (err) {
    console.error("❌ Accounts fetch error:", err.cause?.code || err.message);
    return [];
  }
};

// --------------- State (in-memory + file persistence) ---------------
const STATE_FILE = path.join(__dirname, ".ctrader-state.json");

const loadState = () => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
    }
  } catch {
    /* ignore */
  }
  return { connected: false };
};

const saveState = (s) => {
  fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2));
};

let state = loadState();

// --------------- App ---------------
const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// ---- Exchange authorization code for tokens ----
// cTrader uses GET with query params (matching Python backend)
app.post("/ctrader/exchange-token", async (req, res) => {
  const { code, redirect_uri } = req.body;
  if (!code || !redirect_uri) {
    return res.status(400).json({ message: "code and redirect_uri required" });
  }

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri,
    });

    // cTrader token endpoint accepts GET with query params
    const tokenRes = await fetch(`${CTRADER_TOKEN_URL}?${params}`);

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("Token exchange failed:", tokenRes.status, err);
      return res
        .status(tokenRes.status)
        .json({ message: "Token exchange failed", detail: err });
    }

    const tokenData = await tokenRes.json();
    // cTrader returns camelCase: accessToken, refreshToken, expiresIn
    const accessToken = tokenData.accessToken || tokenData.access_token;
    const refreshToken = tokenData.refreshToken || tokenData.refresh_token;
    const expiresIn = tokenData.expiresIn || tokenData.expires_in;

    console.log("✅ Token received");

    // Fetch trading accounts
    const accounts = await fetchTradingAccounts(accessToken);

    // Save state
    const activeAccount = accounts[0] || null;
    state = {
      connected: true,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      expires_at: Date.now() + (expiresIn || 2628000) * 1000,
      account_id: activeAccount?.account_id || null,
      account_name: activeAccount?.account_name || null,
      accounts,
    };
    saveState(state);

    console.log(
      `✅ Connected! ${accounts.length} account(s) found. Active: ${state.account_name}`,
    );

    res.json({
      success: true,
      account_id: state.account_id,
      account_name: state.account_name,
      accounts_count: accounts.length,
    });
  } catch (err) {
    console.error("Exchange token error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ---- Get connection status ----
app.get("/ctrader/status", (_req, res) => {
  if (!state.connected) {
    return res.json({ connected: false });
  }
  res.json({
    connected: true,
    account_id: state.account_id,
    account_name: state.account_name,
  });
});

// ---- Get trading accounts ----
app.get("/ctrader/accounts", async (_req, res) => {
  if (!state.connected || !state.access_token) {
    return res.status(401).json({ message: "Not connected to CTrader" });
  }

  try {
    const accounts = await fetchTradingAccounts(state.access_token);

    if (!accounts.length && state.accounts?.length) {
      return res.json(state.accounts);
    }

    state.accounts = accounts;
    saveState(state);
    res.json(accounts);
  } catch (err) {
    console.error("Fetch accounts error:", err);
    if (state.accounts?.length) {
      return res.json(state.accounts);
    }
    res.status(500).json({ message: "Failed to fetch accounts" });
  }
});

// ---- Disconnect ----
app.post("/ctrader/disconnect", (_req, res) => {
  state = { connected: false };
  saveState(state);
  console.log("🔌 Disconnected from CTrader");
  res.json({ success: true });
});

// ---- Change active account ----
app.post("/ctrader/change-account", (req, res) => {
  const { account_id } = req.body;
  if (!state.connected) {
    return res.status(401).json({ message: "Not connected" });
  }
  if (!account_id) {
    return res.status(400).json({ message: "account_id required" });
  }

  const account = state.accounts?.find((a) => a.account_id === account_id);
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  state.account_id = account.account_id;
  state.account_name = account.account_name;
  saveState(state);

  console.log(`🔄 Switched to account: ${account.account_name}`);
  res.json({ success: true, account_id, account_name: account.account_name });
});

// ---- Refresh token ----
// cTrader uses GET with query params (matching Python backend)
app.post("/ctrader/refresh-token", async (_req, res) => {
  if (!state.connected || !state.refresh_token) {
    return res.status(401).json({ message: "Not connected" });
  }

  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: state.refresh_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    // cTrader token endpoint accepts GET with query params
    const tokenRes = await fetch(`${CTRADER_TOKEN_URL}?${params}`);

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("Token refresh failed:", err);
      return res.status(tokenRes.status).json({ message: "Refresh failed" });
    }

    const tokenData = await tokenRes.json();
    state.access_token = tokenData.accessToken || tokenData.access_token;
    state.refresh_token =
      tokenData.refreshToken || tokenData.refresh_token || state.refresh_token;
    state.expires_in = tokenData.expiresIn || tokenData.expires_in;
    state.expires_at = Date.now() + (state.expires_in || 2628000) * 1000;
    saveState(state);

    console.log("🔄 Token refreshed");
    res.json({ success: true });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --------------- Start ---------------
app.listen(PORT, () => {
  console.log(`\n🚀 cTrader API server running at http://localhost:${PORT}`);
  console.log(`   Client ID: ${CLIENT_ID.substring(0, 10)}...`);
  console.log(
    `   Status: ${state.connected ? "Connected" : "Not connected"}\n`,
  );
});
