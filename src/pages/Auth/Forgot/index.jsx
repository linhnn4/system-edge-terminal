import ImgLogo from '@/assets/images/logo.png';
import useYup from "@/hooks/useYup";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { yupSync } = useYup();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    setIsSubmiting(true);
    try {
      // const result = await terminalService.login(values);
      // if (result.code === 0) {
      navigate('/verification-forgot');
      // }
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
        <div className='header-title text-general-bold'>Forgot Pasword</div>
      </div>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          name='email'
          rules={[yupSync]}
          label='Email'
        >
          <Input placeholder="Enter your email" autoComplete='email' size='large' />
        </Form.Item>
        <div className='form-footer'>
          <Form.Item shouldUpdate>
            {() => (
              <Button type='primary' htmlType='submit' size='large' block loading={isSubmiting}>
                Send
              </Button>
            )}
          </Form.Item>
        </div>
        <div className='text-link flex justify-center items-center gap-2'>
          <Button type='link' onClick={() => navigate('/login')}>
            Log In With Another Account
          </Button>
        </div>
      </Form>
    </div>
  </div>;
}

export default Forgot;