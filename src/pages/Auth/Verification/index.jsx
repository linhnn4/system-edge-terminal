import IconBack from "@/assets/svgs/arrow-narrow-left.svg?react";
import LoadingIndicator from "@/components/LoadingIndicator";
import useUser from "@/reducers/user";
import terminalService from "@/services/terminal";
import { pad } from "@/utils";
import { CONFIG_RESET_TIME } from "@/utils/constants";
import { Button } from "antd";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

const Verification = () => {
  const signupInfo = useUser(useShallow((state) => state.user.signupInfo));
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isResend, setIsResend] = useState(signupInfo?.isSend || false);

  const onResend = async () => {
    setIsSubmiting(true);
    try {
      await terminalService.requestEmailVerify({ email: signupInfo?.email });
      setIsResend(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    if (!signupInfo) {
      navigate("/signup");
    }
  }, [navigate, signupInfo]);

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form verification">
        <div className="title">
          <div className="back">
            <IconBack fontSize="1.25rem" onClick={() => navigate("/signup")} />
          </div>
          Account Verification
        </div>
        <div className="content">
          We have sent a verification link to your email <br />
          <span>{signupInfo?.email}</span>. Please check your inbox. <br />
          <br />
          If you still haven't received the email, please check your Spam/Junk
          folder or try again with a different email address.
        </div>
        <div className="actions">
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
          <div className="text-link flex justify-center items-center gap-2">
            Already have an account?
            <Button type="link" onClick={() => navigate("/login")}>
              Log In Now
            </Button>
          </div>
        </div>
      </div>
      {isSubmiting && <LoadingIndicator />}
    </div>
  );
};

export default Verification;
