import IconCheckFill from "@/assets/svgs/check-fill.svg?react";
import { REGION_OPTIONS, TIMEZONE_OPTIONS } from "@/configs/timezone";
import useYup from "@/hooks/useYup";
import useUser from "@/reducers/user";
import notificationService from "@/services/notificationService";
import terminalService from "@/services/terminal";
import {
  getDefaultRegion,
  getDefaultTimezone,
  getRegionByTimezone,
} from "@/utils";
import { ROUTERS } from "@/utils/routers";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

const CreateWorkspace = () => {
  const { isLoggedIn, info, workspaces, updateUser } = useUser(
    useShallow((state) => ({
      isLoggedIn: state.user.isLoggedIn,
      workspaces: state.user.workspaces,
      info: state.user.info,
      updateUser: state.updateUser,
    })),
  );
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { yupSync } = useYup();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const inputRef = useRef(null);
  const defaultTimezone = getDefaultTimezone();
  const defaultRegion = getDefaultRegion();
  const newWorkspace = useMemo(() => {
    if (workspaces.length === 0) return null;
    return workspaces[0];
  }, [workspaces]);

  const onFinish = async (values) => {
    setIsSubmiting(true);
    try {
      await terminalService.updateWorkspace({
        name: values.workspaceName,
        timezone: values.timezone,
        region: values.region,
        retention_days: 30,
        workspace_id: newWorkspace.id,
      });
      updateUser({ info: { ...info, is_first_login: false } });
      notificationService.success({
        title: "Workspace created successfully!",
      });
      navigate(ROUTERS.DASHBOARD);
      // }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || !info || info.is_first_login === false) {
      navigate(ROUTERS.DASHBOARD);
    }
  }, [isLoggedIn, info, navigate]);

  useEffect(() => {
    if (newWorkspace && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newWorkspace]);

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form create-workspace">
        <div className="logo">
          <IconCheckFill fontSize="3rem" />
        </div>
        <div className="header">
          <div className="header-text">Sign Up Successfully!</div>
        </div>
        <span className="h-px bg-gray-700 w-full"></span>
        <div className="header">
          <div className="header-title text-general-bold">Create Workspace</div>
          <div className="header-sub text-general-regular">
            Set up a dedicated environment for your trading data.
          </div>
        </div>
        {newWorkspace && (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              timezone: defaultTimezone,
              region: defaultRegion,
              workspaceName: newWorkspace.name,
            }}
          >
            <Form.Item
              name="workspaceName"
              rules={[yupSync]}
              label="Workspace Name"
            >
              <Input
                ref={inputRef}
                placeholder="Enter your workspace name"
                size="large"
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="timezone" rules={[yupSync]} label="Timezone">
                  <Select
                    placeholder="Enter your timezone"
                    size="large"
                    options={TIMEZONE_OPTIONS}
                    showSearch
                    optionFilterProp="label"
                    onChange={(value) => {
                      form.setFieldsValue({
                        region: getRegionByTimezone(value),
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="region" rules={[yupSync]} label="Region">
                  <Select
                    placeholder="Enter your region"
                    size="large"
                    options={REGION_OPTIONS}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              </Col>
            </Row>
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
                    Create Workspace
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CreateWorkspace;
