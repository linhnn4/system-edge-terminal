import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import Forgot from "./pages/Auth/Forgot/Loadable";
import GoogleCallback from "./pages/Auth/GoogleCallback/Loadable";
import Login from "./pages/Auth/Login/Loadable";
import SignUp from "./pages/Auth/SignUp/Loadable";
import Verification from "./pages/Auth/Verification/Loadable";
import VerificationConfirm from "./pages/Auth/VerificationConfirm/Loadable";
import VerificationForgot from "./pages/Auth/VerificationForgot/Loadable";
import CreateWorkspace from "./pages/CreateWorkspace/Loadable";
import Home from "./pages/Home/Loadable";
import useUser from "./reducers/user";
import terminalService from "./services/terminal";
import { ROUTERS } from "./utils/routers";

function App() {
  const accessToken = useUser((state) => state.user.accessToken);
  const updateUser = useUser((state) => state.updateUser);
  const logout = useUser((state) => state.logout);

  useEffect(() => {
    if (!accessToken) return;
    terminalService
      .fetchMe()
      .then((data) => {
        updateUser(data);
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
          <Route
            path={ROUTERS.CREATE_WORKSPACE}
            element={<CreateWorkspace />}
          />
          <Route path={ROUTERS.IMPORT_DATA} element={<Home />} />
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
        <Route path={ROUTERS.GOOGLE_CALLBACK} element={<GoogleCallback />} />
        <Route path="*" element={<Navigate to={ROUTERS.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
