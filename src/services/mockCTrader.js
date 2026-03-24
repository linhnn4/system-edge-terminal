/**
 * Mock data & handlers for cTrader API endpoints.
 * Enable by setting VITE_MOCK_CTRADER=true in .env
 *
 * This simulates the backend responses so the UI can be developed
 * independently. Remove or disable when real backend is ready.
 */

const STORAGE_KEY = "mock_ctrader_state";

const getState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { connected: false };
  } catch {
    return { connected: false };
  }
};

const setState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const MOCK_ACCOUNTS = [
  {
    account_id: "12345678",
    account_name: "Demo USD",
    broker: "Spotware",
    currency: "USD",
    balance: 10000.0,
    is_live: false,
  },
  {
    account_id: "87654321",
    account_name: "Live EUR",
    broker: "Spotware",
    currency: "EUR",
    balance: 25430.5,
    is_live: true,
  },
  {
    account_id: "11223344",
    account_name: "Demo GBP",
    broker: "Spotware",
    currency: "GBP",
    balance: 5000.0,
    is_live: false,
  },
];

const mockCTraderService = {
  ctraderExchangeToken: async ({ code }) => {
    await delay(800);
    if (!code) throw { data: { message: "Invalid code" }, status: 400 };
    const account = MOCK_ACCOUNTS[0];
    setState({
      connected: true,
      account_id: account.account_id,
      account_name: account.account_name,
      broker: account.broker,
      currency: account.currency,
      balance: account.balance,
      is_live: account.is_live,
    });
    return { success: true };
  },

  getCTraderStatus: async () => {
    await delay(300);
    return getState();
  },

  getCTraderAccounts: async () => {
    await delay(400);
    const state = getState();
    if (!state.connected) {
      throw { data: { message: "Not connected" }, status: 401 };
    }
    return MOCK_ACCOUNTS;
  },

  disconnectCTrader: async () => {
    await delay(500);
    setState({ connected: false });
    return { success: true };
  },

  changeCTraderAccount: async ({ account_id }) => {
    await delay(500);
    const account = MOCK_ACCOUNTS.find((a) => a.account_id === account_id);
    if (!account) {
      throw { data: { message: "Account not found" }, status: 404 };
    }
    setState({
      connected: true,
      account_id: account.account_id,
      account_name: account.account_name,
      broker: account.broker,
      currency: account.currency,
      balance: account.balance,
      is_live: account.is_live,
    });
    return { success: true };
  },
};

export default mockCTraderService;
