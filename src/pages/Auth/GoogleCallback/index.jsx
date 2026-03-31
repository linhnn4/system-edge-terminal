import LoadingIndicator from "@/components/LoadingIndicator";
import useUser from "@/reducers/user";
import notificationService from "@/services/notificationService";
import terminalService from "@/services/terminal";
import { ROUTERS } from "@/utils/routers";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const hasCalled = useRef(false);
  const updateUser = useUser((state) => state.updateUser);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const handle = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const error = params.get("error");

      // Clean tokens from URL immediately
      window.history.replaceState({}, "", "/auth/google/callback");

      if (error) {
        notificationService.error({
          title:
            error === "access_denied"
              ? "Google login was cancelled."
              : `Google login failed: ${error}`,
        });
        navigate(ROUTERS.LOGIN);
        return;
      }

      if (!accessToken) {
        notificationService.error({
          title: "No access token received from Google login.",
        });
        navigate(ROUTERS.LOGIN);
        return;
      }

      try {
        await updateUser({
          accessToken,
          refreshToken,
        });

        const result = await terminalService.fetchMe();
        updateUser({ info: result, isLoggedIn: true });

        navigate(ROUTERS.DASHBOARD);
      } catch {
        notificationService.error({
          title: "Google login succeeded but failed to retrieve user info.",
        });
        navigate(ROUTERS.LOGIN);
      }
    };

    handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingIndicator />;
};

export default GoogleCallback;
