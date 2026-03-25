import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingIndicator from "./components/LoadingIndicator";

const UnAuthGuard = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Outlet />
    </Suspense>
  );
};

export default UnAuthGuard;
