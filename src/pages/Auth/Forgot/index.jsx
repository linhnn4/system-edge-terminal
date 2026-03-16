import ImgLogo from "@/assets/images/logo.png";
import LoadingIndicator from "@/components/LoadingIndicator";
import useYup from "@/hooks/useYup";
import useUser from "@/reducers/user";
import notificationService from "@/services/notificationService";
import terminalService from "@/services/terminal";
import { ROUTERS } from "@/utils/routers";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { yupSync } = useYup();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const updateForgotInfo = useUser((state) => state.updateForgotInfo);

  const onFinish = async (values) => {
    setIsSubmiting(true);
    try {
      await terminalService.forgotPassword(values);
      updateForgotInfo(values);
      notificationService.success({
        title: "Please check your email for reset password instructions.",
      });
      navigate(ROUTERS.VERIFICATION_FORGOT);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <div className="logo">
          <img src={ImgLogo} alt="logo" className="logo-img" />
        </div>
        <div className="header">
          <div className="header-title text-general-bold">Forgot Password</div>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" rules={[yupSync]} label="Email">
            <Input
              placeholder="Enter your email"
              autoComplete="email"
              size="large"
              autoFocus
            />
          </Form.Item>
          <div className="form-footer">
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isSubmiting}
                >
                  Send
                </Button>
              )}
            </Form.Item>
          </div>
          <div className="text-link flex justify-center items-center gap-2">
            <Button type="link" onClick={() => navigate(ROUTERS.LOGIN)}>
              Log In With Another Account
            </Button>
          </div>
        </Form>
      </div>
      {isSubmiting && <LoadingIndicator />}
    </div>
  );
};

export default Forgot;
