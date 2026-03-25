import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import Containner from "./components/Container";
import useUser from "./reducers/user";

const AuthGuard = () => {
  const isLoggedIn = useUser(useShallow((state) => state.user.isLoggedIn));

  return isLoggedIn ? (
    <Containner>
      <Outlet />
    </Containner>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AuthGuard;
