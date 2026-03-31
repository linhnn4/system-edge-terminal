import ImgLogo from "@/assets/images/logo.png";
import IconEyeOff from "@/assets/svgs/eye-off.svg?react";
import IconEyeOn from "@/assets/svgs/eye.svg?react";
import IconGoogle from "@/assets/svgs/google.svg?react";
import LoadingIndicator from "@/components/LoadingIndicator";
import useYup from "@/hooks/useYup";
import useUser from "@/reducers/user";
import terminalService from "@/services/terminal";
import { API_URL } from "@/utils/constants";
import ERRORS from "@/utils/errors";
import { ROUTERS } from "@/utils/routers";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { yupSync } = useYup();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser, updateSignupInfo, logout } = useUser(
    useShallow((state) => ({
      updateUser: state.updateUser,
      updateSignupInfo: state.updateSignupInfo,
      logout: state.logout,
    })),
  );

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google/login?from_url=${window.location.origin}`;
  };

  const onFinish = async (values) => {
    setIsSubmiting(true);
    try {
      const result = await terminalService.login(values);
      updateUser({
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
      });
      const resultMe = await terminalService.fetchMe();
      updateUser({
        ...resultMe,
        isLoggedIn: true,
      });
      navigate(ROUTERS.DASHBOARD);
    } catch (e) {
      // handle error not verified
      if (e?.data?.message === ERRORS.NOT_VERIFIED) {
        updateSignupInfo({ values, isSend: false });
        navigate(ROUTERS.VERIFICATION);
      }
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <div className="logo">
          <img src={ImgLogo} alt="logo" className="logo-img" />
        </div>
        <div className="header">
          <div className="header-title text-general-bold">
            Welcome to SystemEdge
          </div>
          <div className="header-sub text-general-regular">
            Manage Your Trading Faster!
          </div>
        </div>
        <Button
          size="large"
          block
          className="google-btn text-md-regular"
          onClick={loginWithGoogle}
        >
          <IconGoogle fontSize="1.5rem" />
          Sign In with Google
        </Button>
        <div className="divider">
          <span className="divider-text">Or</span>
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
          <Form.Item label="Password" name="password" rules={[yupSync]}>
            <div className="password-input-wrapper">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="password"
                size="large"
              />
              <button
                type="button"
                className="password-toggle-absolute"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setShowPassword((prevState) => !prevState)}
                tabIndex={-1}
              >
                {showPassword ? <IconEyeOn /> : <IconEyeOff />}
              </button>
            </div>
          </Form.Item>
          <div className="flex justify-end">
            <Button
              type="link"
              onClick={() => navigate("/forgot-password")}
              tabIndex={-1}
            >
              Forgot Password?
            </Button>
          </div>
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
                  Log In
                </Button>
              )}
            </Form.Item>
          </div>
          <div className="text-link flex justify-center items-center gap-2">
            Don't have an account?
            <Button type="link" onClick={() => navigate(ROUTERS.SIGNUP)}>
              Sign Up Now
            </Button>
          </div>
        </Form>
      </div>
      {isSubmiting && <LoadingIndicator />}
    </div>
  );
};

export default Login;
