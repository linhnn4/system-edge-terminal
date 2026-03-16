import ImgLogo from "@/assets/images/logo.png";
import IconEyeOff from "@/assets/svgs/eye-off.svg?react";
import IconEyeOn from "@/assets/svgs/eye.svg?react";
import InputHiddenRemember from "@/components/InputHiddenRemember";
import LoadingIndicator from "@/components/LoadingIndicator";
import useYup from "@/hooks/useYup";
import notificationService from "@/services/notificationService";
import terminalService from "@/services/terminal";
import { ROUTERS } from "@/utils/routers";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { yupSync } = useYup();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onFinish = async (values) => {
    setIsSubmiting(true);
    try {
      await terminalService.resetPassword({
        token,
        new_password: values.password,
      });
      notificationService.success({
        title: "Your password has been reset successfully.",
      });
      navigate(ROUTERS.LOGIN);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate(ROUTERS.LOGIN);
    }
  }, [navigate, token]);

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <div className="logo">
          <img src={ImgLogo} alt="logo" className="logo-img" />
        </div>
        <div className="header">
          <div className="header-title text-general-bold">Reset Password</div>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <InputHiddenRemember name="password" type="password" />
          <Form.Item label="New Password" name="password" rules={[yupSync]}>
            <div className="password-input-wrapper">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                size="large"
              />
              <button
                type="button"
                className="password-toggle-absolute"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? <IconEyeOn /> : <IconEyeOff />}
              </button>
            </div>
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirm_password"
            rules={[
              {
                async validator(_, curConfirmPassword) {
                  const curPassword = form.getFieldValue("password");
                  if (curConfirmPassword) {
                    if (curConfirmPassword !== curPassword) {
                      return Promise.reject("Passwords do not match!");
                    }
                  } else {
                    return Promise.reject("Please confirm your password!");
                  }
                },
              },
            ]}
          >
            <div className="password-input-wrapper">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                size="large"
              />
              <button
                type="button"
                className="password-toggle-absolute"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                onMouseDown={(event) => event.preventDefault()}
                onClick={() =>
                  setShowConfirmPassword((prevState) => !prevState)
                }
              >
                {showConfirmPassword ? <IconEyeOn /> : <IconEyeOff />}
              </button>
            </div>
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
                  Reset Password
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

export default ResetPassword;
