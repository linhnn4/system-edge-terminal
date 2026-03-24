import axios from "axios";

/**
 * Separate axios instance for cTrader local server.
 * - No Bearer token from app auth
 * - No 401 refresh/logout interceptor
 */
const ctraderClient = axios.create({
  baseURL: "http://localhost:3001",
});

// Unwrap response data (same pattern as main client)
ctraderClient.interceptors.response.use(
  ({ data }) => data,
  (error) => Promise.reject(error.response || error),
);

export default /** @type {any} */ (ctraderClient);
