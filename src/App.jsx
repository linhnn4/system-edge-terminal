import { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import UnAuthGuard from "./UnAuthGuard";
import useUser from "./reducers/user";
import terminalService from "./services/terminal";
import { ROUTERS } from "./utils/routers";

// Authenticated pages
const Home = lazy(() => import("./pages/Home"));
const Import = lazy(() => import("./pages/Import"));
const CreateWorkspace = lazy(() => import("./pages/CreateWorkspace"));

// Public pages
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Forgot = lazy(() => import("./pages/Auth/Forgot"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const Verification = lazy(() => import("./pages/Auth/Verification"));
const VerificationConfirm = lazy(
  () => import("./pages/Auth/VerificationConfirm"),
);
const VerificationForgot = lazy(
  () => import("./pages/Auth/VerificationForgot"),
);
const GoogleCallback = lazy(() => import("./pages/Auth/GoogleCallback"));
const CTraderCallback = lazy(() => import("./pages/CTraderCallback"));

function App() {
  const accessToken = useUser((state) => state.user.accessToken);
  const updateUser = useUser((state) => state.updateUser);
  const logout = useUser((state) => state.logout);

  useEffect(() => {
    if (!accessToken) return;
    terminalService
      .fetchMe()
      .then((res) => {
        updateUser({ info: res.data });
      })
      .catch(() => {
        logout();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path={ROUTERS.DASHBOARD} element={<Home />} />

          <Route path={ROUTERS.IMPORT_DATA} element={<Import />} />
          <Route path={ROUTERS.TRADES} element={<Home />} />
          <Route path={ROUTERS.SYSTEM} element={<Home />} />
          <Route path={ROUTERS.BENCHMARKS} element={<Home />} />
          <Route path={ROUTERS.COACH} element={<Home />} />
          <Route path={ROUTERS.SETTINGS.BASE} element={<Home />} />
          <Route path={ROUTERS.SETTINGS.PROFILE} element={<Home />} />
          <Route path={ROUTERS.SETTINGS.WORKSPACE} element={<Home />} />
          <Route path={ROUTERS.SETTINGS.AI_COACH} element={<Home />} />
          <Route path={ROUTERS.SETTINGS.DATE_INTEGRATIONS} element={<Home />} />
          <Route path={ROUTERS.SETTINGS.NOTIFICATION} element={<Home />} />
          <Route path={ROUTERS.SETTINGS.SECURITY} element={<Home />} />
          <Route path={ROUTERS.SETTINGS.BILLING} element={<Home />} />
        </Route>
        <Route element={<UnAuthGuard />}>
          <Route path={ROUTERS.LOGIN} element={<Login />} />
          <Route path={ROUTERS.SIGNUP} element={<SignUp />} />
          <Route path={ROUTERS.FORGOT_PASSWORD} element={<Forgot />} />
          <Route path={ROUTERS.VERIFICATION} element={<Verification />} />
          <Route
            path={ROUTERS.VERIFICATION_CONFIRM}
            element={<VerificationConfirm />}
          />
          <Route
            path={ROUTERS.VERIFICATION_FORGOT}
            element={<VerificationForgot />}
          />
          <Route path={ROUTERS.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTERS.GOOGLE_CALLBACK} element={<GoogleCallback />} />
          <Route
            path={ROUTERS.CTRADER_CALLBACK}
            element={<CTraderCallback />}
          />
        </Route>
        <Route path={ROUTERS.CREATE_WORKSPACE} element={<CreateWorkspace />} />
        <Route path="*" element={<Navigate to={ROUTERS.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
