import ImgLogo from '@/assets/images/logo.png';
import IconGoogle from '@/assets/svgs/google.svg?react';
import useYup from "@/hooks/useYup";
import terminalService from "@/services/terminal";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { yupSync } = useYup();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmiting(true);
    try {
      const result = await terminalService.register(values);
      if (result.code === 0) {
        navigate('/verification');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmiting(false);
    }
  };

  return <div className="auth-form-wrapper">
    <div className="auth-form">
      <div className="logo">
        <img src={ImgLogo} alt="logo" className="logo-img" />
      </div>
      <div className='header'>
        <div className='header-title text-general-bold'>Welcome to SystemEdge</div>
        <div className='header-sub text-general-regular'>Manage Your Trading Faster!</div>
      </div>
      <Button size='large' block className='google-btn text-md-regular'>
        <IconGoogle fontSize="1.5rem" />
        Sign Up with Google
      </Button>
      <div className='divider'>
        <span className='divider-text'>Or</span>
      </div>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          name='username'
          rules={[yupSync]}
          label='Username'
        >
          <Input placeholder="Enter your username" autoComplete='username' size='large' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[yupSync]}
          label='Email'
        >
          <Input placeholder="Enter your email" autoComplete='email' size='large' />
        </Form.Item>
        <Form.Item label='Password' name='password' rules={[yupSync]}>
          <Input.Password placeholder="Enter your password" autoComplete='password' size='large' />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          name='confirm_password'
          rules={[
            {
              async validator(_, curConfirmPassword) {
                const curPassword = form.getFieldValue('password');
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
          <Input.Password
            placeholder="Confirm your password"
            autoComplete='confirmPassword'
            size='large'
          />
        </Form.Item>
        <div className='text-link'>
          By clicking on the Sign Up button you are accepting our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
        <div className='form-footer'>
          <Form.Item shouldUpdate>
            {() => (
              <Button type='primary' htmlType='submit' size='large' block loading={isSubmiting}>
                Sign Up
              </Button>
            )}
          </Form.Item>
        </div>
        <div className='text-link flex justify-center items-center'>
          Already have an account?
          <Button type='link' onClick={() => navigate('/login')}>
            Log In Now
          </Button>
        </div>
      </Form>
    </div>
  </div>;
}

export default Register;