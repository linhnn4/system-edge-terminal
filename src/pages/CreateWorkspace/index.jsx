import IconCheckFill from '@/assets/svgs/check-fill.svg?react';
import useYup from "@/hooks/useYup";
import { REGION_OPTIONS, TIMEZONE_OPTIONS } from '@/utils/constants';
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateWorkspace = () => {
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
      navigate('/');
      // }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmiting(false);
    }
  };

  return <div className="auth-form-wrapper">
    <div className="auth-form create-workspace">
      <div className="logo">
        <IconCheckFill fontSize="3rem" />
      </div>
      <div className='header'>
        <div className='header-text'>Sign Up Successfully!</div>
      </div>
      <span className='h-px bg-gray-700 w-full'></span>
      <div className='header'>
        <div className='header-title text-general-bold'>Create Workspace</div>
        <div className='header-sub text-general-regular'>Set up a dedicated environment for your trading data.</div>
      </div>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          name='workspaceName'
          rules={[yupSync]}
          label='Workspace Name'
        >
          <Input placeholder="Enter your workspace name" size='large' />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='timezone'
              rules={[yupSync]}
              label='Timezone'
            >
              <Select placeholder="Enter your timezone" size='large' options={TIMEZONE_OPTIONS} showSearch optionFilterProp='label' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='region'
              rules={[yupSync]}
              label='Region'
            >
              <Select placeholder="Enter your region" size='large' options={REGION_OPTIONS} showSearch optionFilterProp='label' />
            </Form.Item></Col>
        </Row>
        <div className='form-footer'>
          <Form.Item shouldUpdate>
            {() => (
              <Button type='primary' htmlType='submit' size='large' block loading={isSubmiting}>
                Create Workspace
              </Button>
            )}
          </Form.Item>
        </div>
      </Form>
    </div>
  </div>;
}

export default CreateWorkspace;