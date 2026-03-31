import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import Containner from "./components/Container";
import LoadingIndicator from "./components/LoadingIndicator";
import useUser from "./reducers/user";
import { ROUTERS } from "./utils/routers";

const AuthGuard = () => {
  const { isLoggedIn, info } = useUser(
    useShallow((state) => ({
      isLoggedIn: state.user.isLoggedIn,
      info: state.user.info,
    })),
  );

  if (isLoggedIn && info?.is_first_login) {
    return <Navigate to={ROUTERS.CREATE_WORKSPACE} replace />;
  }
  return isLoggedIn ? (
    <Containner>
      <Suspense fallback={<LoadingIndicator />}>
        <Outlet />
      </Suspense>
    </Containner>
  ) : (
    <Navigate to={ROUTERS.LOGIN} replace />
  );
};

export default AuthGuard;
