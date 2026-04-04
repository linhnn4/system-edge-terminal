import LottieError from "@/assets/lotties/fail.json";
import LottieSuccess from "@/assets/lotties/success.json";
import LoadingIndicator from "@/components/LoadingIndicator";
import notificationService from "@/services/notificationService";
import terminalService from "@/services/terminal";
import { pad } from "@/utils";
import { CONFIG_RESET_TIME } from "@/utils/constants";
import ERRORS from "@/utils/errors";
import { ROUTERS } from "@/utils/routers";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

const VerificationConfirm = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

  const { isLoading, isError } = useQuery({
    queryKey: ["verifyEmail", { token, email }],
    queryFn: () =>
      terminalService.verifyEmail({ token }, { ignoreError: true }),
    enabled: !!token && !!email,
  });

  const onResend = async () => {
    setIsSubmiting(true);
    try {
      const result = await terminalService.requestEmailVerify({
        email,
        frontend_url: window.location.origin,
      });
      if (result.message === ERRORS.ALREADY_VERIFIED) {
        notificationService.success({
          title: "Email already verified",
        });
        navigate(ROUTERS.LOGIN);
      }
      setIsResend(true);
    } catch (e) {
      console.log(e);
      setIsResend(false);
      setCountdownKey((prev) => prev + 1);
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    if (!token || !email) {
      navigate(ROUTERS.SIGNUP);
    }
  }, [navigate, token, email]);

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <div className="title">Email Verification</div>
        <div className="content">
          {isError ? (
            <div className="flex flex-col gap-3 text-center">
              <div className="icon-lottie">
                <Lottie animationData={LottieError} />
              </div>
              <div className="sub-title">Something Went Wrong!</div>
              We couldn't verify your email address. Please try again or request
              a new verification email.
            </div>
          ) : (
            <div className="flex flex-col gap-3 text-center">
              <div className="icon-lottie">
                <Lottie animationData={LottieSuccess} />
              </div>
              <div className="sub-title">Your Email has been verified!</div>
              Your Email address has been successfully verified. Let's set up
              your workspace to get started!
            </div>
          )}
        </div>
        <div className="actions">
          {isError && (
            <Button
              type="primary"
              block
              size="large"
              disabled={isSubmiting || isResend}
              onClick={onResend}
            >
              {isResend ? (
                <>
                  Resend Verification Email after{" "}
                  <Countdown
                    key={countdownKey}
                    date={Date.now() + CONFIG_RESET_TIME}
                    renderer={({ seconds, minutes }) =>
                      `${pad(minutes)}:${pad(seconds)}`
                    }
                    onComplete={() => {
                      setIsResend(false);
                      setIsSubmiting(false);
                    }}
                  />
                </>
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          )}
          <div className="text-link flex justify-center items-center gap-2">
            <Button type="link" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </div>
        </div>
      </div>
      {(isSubmiting || isLoading) && <LoadingIndicator />}
    </div>
  );
};

export default VerificationConfirm;
