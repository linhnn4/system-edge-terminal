import IconBack from "@/assets/svgs/arrow-narrow-left.svg?react";
import useUser from "@/reducers/user";
import { pad } from "@/utils";
import { App, Button } from "antd";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

const Verification = () => {
  const { notification } = App.useApp();
  const signupInfo = useUser(useShallow((state) => state.user.signupInfo));
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(true);
  const [isResend, setIsResend] = useState(true);

  const onResend = async () => {
    setIsSubmiting(true);
    try {
      // const result = await terminalService.resend();
      // if (result?.data?.otp_ttl) {
      setIsResend(true);
      // }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    notification.info({
      title: "Verification Email Sent",
      description: `A verification email has been sent to ${signupInfo?.email}. Please check your inbox and click the verification link to activate your account.`,
      duration: 50000,
    });
  }, [notification, signupInfo?.email]);

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
            disabled={isSubmiting}
            onClick={onResend}
          >
            {isResend ? (
              <>
                Resend Verification Email after{" "}
                <Countdown
                  // eslint-disable-next-line react-hooks/purity
                  date={Date.now() + 90000}
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
    </div>
  );
};

export default Verification;
