import IconBack from "@/assets/svgs/arrow-narrow-left.svg?react";
import { pad } from "@/utils";
import { Button } from "antd";
import { useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

const VerificationForgot = () => {
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

  return <div className="auth-form-wrapper">
    <div className="auth-form verification">
      <div className="title">
        <div className="back">
          <IconBack fontSize="1.25rem" onClick={() => navigate('/login')} />
        </div>
        Forgot Password Verification</div>
      <div className="content">
        We have sent a verification link to your email <br /><span>demo-001@gmail.com</span>. Please check your inbox. <br /><br />
        If you still haven't received the email, please check your Spam/Junk folder or try again with a different email address.
      </div>
      <div className="actions">
        <Button type="primary" block size="large" disabled={isSubmiting} onClick={onResend}>
          {isResend ? <>Resend Verification Email after <Countdown
            // eslint-disable-next-line react-hooks/purity
            date={Date.now() + 90000}
            renderer={({ seconds, minutes }) => `${pad(minutes)}:${pad(seconds)}`}
            onComplete={() => { setIsResend(false); setIsSubmiting(false); }}
          /></> : "Resend Verification Email"}
        </Button>
        <div className='text-link flex justify-center items-center gap-2'>
          <Button type='link' onClick={() => navigate('/login')}>
            Log In With Another Account
          </Button>
        </div>
      </div>
    </div>
  </div>;
}

export default VerificationForgot;