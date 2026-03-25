import IconCTrader from "@/assets/svgs/ctrader.svg?react";
import IconDashboard from "@/assets/svgs/dashboard.svg?react";
import { ContentWrapper } from "@/components/Container";
import useUser from "@/reducers/user";
import ctraderService from "@/services/ctraderService";
import {
  CTRADER_AUTH_URL,
  CTRADER_CLIENT_ID,
  CTRADER_REDIRECT_URI,
} from "@/utils/constants";
import { ROUTERS } from "@/utils/routers";
import { Button, Modal, Select } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";

const CTraderCard = styled.div`
  display: flex;
  padding: 1.5rem;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
  border-radius: 0.75rem;
  border: 1px solid var(--color-grey-70050, rgba(51, 65, 85, 0.5));
  background: var(--color-grey-80050, rgba(30, 41, 59, 0.5));
  backdrop-filter: blur(12px);
  justify-content: space-between;

  .ctrader-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .ctrader-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
      background: rgba(39, 97, 234, 0.15);
      color: #2761ea;
    }

    .ctrader-details {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;

      .ctrader-title {
        color: var(--color-white-solid, #fff);
        font-family: var(--font-family-Font-1, Inter);
        font-size: var(--font-size-14, 0.875rem);
        font-weight: var(--font-weight-600, 600);
        line-height: var(--line-height-20, 1.25rem);
      }

      .ctrader-account {
        color: var(--color-grey-400, #94a3b8);
        font-family: var(--font-family-Font-1, Inter);
        font-size: var(--font-size-12, 0.75rem);
        font-weight: var(--font-weight-400, 400);
        line-height: 1.125rem;
      }
    }
  }

  .ctrader-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.125rem;

    &.connected {
      background: rgba(16, 185, 129, 0.15);
      color: #10b981;
    }

    &.disconnected {
      background: rgba(148, 163, 184, 0.15);
      color: #94a3b8;
    }

    .status-dot {
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background: currentColor;
    }
  }
`;

const Import = () => {
  const navigate = useNavigate();
  const info = useUser(useShallow((state) => state.user.info));

  const [ctraderStatus, setCtraderStatus] = useState(null);
  const [ctraderAccounts, setCtraderAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [changingAccount, setChangingAccount] = useState(false);
  const popupRef = useRef(null);

  const isConnected = ctraderStatus?.connected === true;

  const fetchCTraderStatus = useCallback(async () => {
    try {
      setLoading(true);
      const status = await ctraderService.getStatus();
      setCtraderStatus(status);
    } catch {
      setCtraderStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCTraderStatus();
  }, [fetchCTraderStatus]);

  // Listen for OAuth callback message from popup
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "CTRADER_CALLBACK") return;

      const { code } = event.data;
      if (!code) return;

      try {
        setLoading(true);
        await ctraderService.exchangeToken({
          code,
          redirect_uri: CTRADER_REDIRECT_URI,
        });
        await fetchCTraderStatus();
      } catch (err) {
        console.error("CTrader exchange-token failed:", err);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [fetchCTraderStatus]);

  const handleConnect = () => {
    const params = new URLSearchParams({
      client_id: CTRADER_CLIENT_ID,
      redirect_uri: CTRADER_REDIRECT_URI,
      scope: "trading",
      response_type: "code",
    });
    const url = `${CTRADER_AUTH_URL}?${params.toString()}`;

    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();
      return;
    }

    popupRef.current = window.open(
      url,
      "ctrader_auth",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`,
    );
  };

  const handleDisconnect = async () => {
    Modal.confirm({
      title: "Disconnect CTrader",
      content:
        "Are you sure you want to disconnect your CTrader account? You will need to reconnect to import trades.",
      okText: "Disconnect",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setDisconnecting(true);

          // Clear cTrader SSO session via hidden iframe
          try {
            await new Promise((resolve) => {
              const iframe = document.createElement("iframe");
              iframe.style.cssText =
                "position:fixed;width:0;height:0;border:none;opacity:0;pointer-events:none;";
              iframe.src = "https://id.ctrader.com/logout";
              iframe.onload = () => {
                setTimeout(() => {
                  iframe.remove();
                  resolve();
                }, 2000);
              };
              // Fallback if onload never fires
              setTimeout(() => {
                try {
                  iframe.remove();
                } catch {
                  /* ignore */
                }
                resolve();
              }, 1000);
              document.body.appendChild(iframe);
            });
          } catch {
            /* non-critical */
          }

          await ctraderService.disconnect();
          setCtraderStatus(null);
          setCtraderAccounts([]);
        } catch {
          // error handled by axios interceptor
        } finally {
          setDisconnecting(false);
        }
      },
    });
  };

  const handleOpenChangeAccount = async () => {
    try {
      const accounts = await ctraderService.getAccounts();
      setCtraderAccounts(accounts);
      setSelectedAccount(ctraderStatus?.account_id || null);
      setChangeModalOpen(true);
    } catch {
      // error handled by axios interceptor
    }
  };

  const handleChangeAccount = async () => {
    if (!selectedAccount) return;
    try {
      setChangingAccount(true);
      await ctraderService.changeAccount({
        account_id: selectedAccount,
      });
      setChangeModalOpen(false);
      await fetchCTraderStatus();
    } catch {
      // error handled by axios interceptor
    } finally {
      setChangingAccount(false);
    }
  };

  return (
    <>
      <div className="page-title mb-2">Import</div>
      <div className="page-sub-title mb-6">
        Welcome, {info?.username}. Your system is evolving.
      </div>

      <CTraderCard className="mb-4">
        <div className="ctrader-info">
          <div className="ctrader-icon">
            <IconCTrader />
          </div>
          <div className="ctrader-details">
            <div className="ctrader-title">CTrader</div>
            <div className="ctrader-account">
              {isConnected
                ? `Account: ${ctraderStatus.account_name || ctraderStatus.account_id}`
                : "Not connected"}
            </div>
          </div>
          <span
            className={`status-badge ${isConnected ? "connected" : "disconnected"}`}
          >
            <span className="status-dot" />
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="ctrader-actions">
          {isConnected ? (
            <>
              <Button size="small" onClick={handleOpenChangeAccount}>
                Change Account
              </Button>
              <Button
                size="small"
                danger
                onClick={handleDisconnect}
                loading={disconnecting}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              size="small"
              onClick={handleConnect}
              loading={loading}
            >
              Connect
            </Button>
          )}
        </div>
      </CTraderCard>

      <ContentWrapper>
        <IconDashboard />
        <div className="text-desc mb-2">
          Upload your first trades to generate and review the data analysis
        </div>
        <div
          className="text-link-a"
          onClick={() => navigate(ROUTERS.IMPORT_DATA)}
        >
          Go To Import
        </div>
      </ContentWrapper>

      <Modal
        title="Change CTrader Account"
        open={changeModalOpen}
        onCancel={() => setChangeModalOpen(false)}
        onOk={handleChangeAccount}
        okText="Switch Account"
        confirmLoading={changingAccount}
        okButtonProps={{ disabled: !selectedAccount }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
          <span className="text-desc">
            Select the CTrader account you want to use:
          </span>
        </div>
        <Select
          style={{ width: "100%" }}
          placeholder="Select an account"
          value={selectedAccount}
          onChange={setSelectedAccount}
          options={ctraderAccounts.map((acc) => ({
            label: acc.account_name || acc.account_id,
            value: acc.account_id,
          }))}
        />
      </Modal>
    </>
  );
};

export default Import;
