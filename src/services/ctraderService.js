import ctraderClient from "./ctraderAxios";

const ctraderService = {
  exchangeToken: (body) => ctraderClient.post("/ctrader/exchange-token", body),
  getStatus: () => ctraderClient.get("/ctrader/status"),
  getAccounts: () => ctraderClient.get("/ctrader/accounts"),
  disconnect: () => ctraderClient.post("/ctrader/disconnect"),
  changeAccount: (body) => ctraderClient.post("/ctrader/change-account", body),
};

export default ctraderService;
