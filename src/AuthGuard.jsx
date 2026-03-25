import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import Containner from "./components/Container";
import LoadingIndicator from "./components/LoadingIndicator";
import useUser from "./reducers/user";

const AuthGuard = () => {
  const isLoggedIn = useUser(useShallow((state) => state.user.isLoggedIn));

  return isLoggedIn ? (
    <Containner>
      <Suspense fallback={<LoadingIndicator />}>
        <Outlet />
      </Suspense>
    </Containner>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AuthGuard;
