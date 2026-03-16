import IconBack from "@/assets/svgs/arrow-narrow-left.svg?react";
import useUser from "@/reducers/user";
import { ROUTERS } from "@/utils/routers";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const VerificationForgot = () => {
  const forgotInfo = useUser(useShallow((state) => state.user.forgotInfo));
  const navigate = useNavigate();

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form verification">
        <div className="title">
          <div className="back">
            <IconBack
              fontSize="1.25rem"
              onClick={() => navigate(ROUTERS.LOGIN)}
            />
          </div>
          Forgot Password Verification
        </div>
        <div className="content">
          We have sent a verification link to your email <br />
          <span>{forgotInfo?.email}</span>. Please check your inbox. <br />
          <br />
          If you still haven't received the email, please check your Spam/Junk
          folder or try again with a different email address.
        </div>
        <div className="actions">
          <div className="text-link flex justify-center items-center gap-2">
            <Button type="link" onClick={() => navigate(ROUTERS.LOGIN)}>
              Log In With Another Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationForgot;
