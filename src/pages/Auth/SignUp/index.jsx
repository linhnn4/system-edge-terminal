import ImgLogo from "@/assets/images/logo.png";
import IconEyeOff from "@/assets/svgs/eye-off.svg?react";
import IconEyeOn from "@/assets/svgs/eye.svg?react";
import IconGoogle from "@/assets/svgs/google.svg?react";
import InputHiddenRemember from "@/components/InputHiddenRemember";
import LoadingIndicator from "@/components/LoadingIndicator";
import useRecaptchaV3 from "@/hooks/useRecaptchaV3";
import useYup from "@/hooks/useYup";
import useUser from "@/reducers/user";
import terminalService from "@/services/terminal";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const updateSignupInfo = useUser((state) => state.updateSignupInfo);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { yupSync } = useYup();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Initialize reCAPTCHA v3 hook
  const {
    executeRecaptcha,
    isLoaded: recaptchaLoaded,
    error: recaptchaError,
  } = useRecaptchaV3({
    action: "signup",
  });

  const onFinish = async (values) => {
    setIsSubmiting(true);
    try {
      const token = await executeRecaptcha();
      if (!token) {
        console.error("reCAPTCHA verification failed");
        return;
      }
      const signupInfo = {
        ...values,
        recaptcha_token: token,
        frontend_url: window.location.origin,
      };
      await terminalService.signup(signupInfo);
      updateSignupInfo({ values: signupInfo, isSend: true });

      navigate("/verification");
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmiting(false);
    }
  };

  if (!recaptchaLoaded) {
    return <LoadingIndicator />;
  }

  if (recaptchaError) {
    return (
      <div className="auth-form-wrapper">
        <div className="auth-form">
          <div className="error-message">{recaptchaError}</div>
        </div>
      </div>
    );
  }

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
        <Button size="large" block className="google-btn text-md-regular">
          <IconGoogle fontSize="1.5rem" />
          Sign Up with Google
        </Button>
        <div className="divider">
          <span className="divider-text">Or</span>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <InputHiddenRemember name="username" />
          <InputHiddenRemember name="email" />
          <InputHiddenRemember name="password" type="password" />
          <Form.Item name="username" rules={[yupSync]} label="Username">
            <Input placeholder="Enter your username" size="large" autoFocus />
          </Form.Item>
          <Form.Item name="email" rules={[yupSync]} label="Email">
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[yupSync]}>
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
                tabIndex={-1}
              >
                {showPassword ? <IconEyeOn /> : <IconEyeOff />}
              </button>
            </div>
          </Form.Item>
          <Form.Item
            label="Confirm Password"
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
                tabIndex={-1}
              >
                {showConfirmPassword ? <IconEyeOn /> : <IconEyeOff />}
              </button>
            </div>
          </Form.Item>
          <div className="text-link">
            By clicking on the Sign Up button you are accepting our{" "}
            <a
              href="/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Privacy Policy
            </a>
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
                  Sign Up
                </Button>
              )}
            </Form.Item>
          </div>
          <div className="text-link flex justify-center items-center gap-2">
            Already have an account?
            <Button type="link" onClick={() => navigate("/login")}>
              Log In Now
            </Button>
          </div>
        </Form>
      </div>
      {isSubmiting && <LoadingIndicator />}
    </div>
  );
};

export default SignUp;
