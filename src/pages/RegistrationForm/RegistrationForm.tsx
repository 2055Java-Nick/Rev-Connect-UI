import React from 'react';
import { Form, Input, Button, Select, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { onFinish, onFinishFailed } from '../../formHandlers';
import '../../styles/pages/RegistrationForm.css'; // Correct the import path
import logo from '../../assets/Revconnect.png'; // Import the image

const { Option } = Select;

export type FieldType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
  email?: string;
  accounttype?: string;
  remember?: string;
};

// clean user information
onLoginPage();
function onLoginPage(){
  localStorage.removeItem("userInfo");
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="registration-form-container">
      <img src={logo} alt="Logo" className="form-logo" /> {/* Add the image */}
      <Form
        name="registration"
        onFinish={onFinish(navigate)}
        onFinishFailed={onFinishFailed}
        initialValues={{
          accounttype: 'user'
        }}
        className="registration-form"
      >
        <Form.Item<FieldType>
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: 'Please input your firstname!' }]}
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: 'Please input your lastname!' }]}
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="registration-form-field"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Account Type"
          name="accounttype"
          rules={[{ required: true, message: 'Please select your account type!' }]}
          className="registration-form-field"
        >
          <Select placeholder="Please Select">
            <Option value="user">Personal</Option>
            <Option value="admin">Business</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 24 }}
          className="registration-form-field"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }} className="registration-form-field">
          <Button type="primary" htmlType="submit" className="registration-form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;