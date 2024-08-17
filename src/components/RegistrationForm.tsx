import React from 'react';
import { Form, Input, Button, Select, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { onFinish, onFinishFailed } from '../formHandlers';
import './RegistrationForm.css'; // Import the CSS file
import logo from '../assets/Revconnect.png'; // Import the image

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
    <div className="form-container">
      <img src={logo} alt="Logo" className="form-logo" /> {/* Add the image */}
      <Form
        name="registration"
        onFinish={onFinish(navigate)}
        onFinishFailed={onFinishFailed}
        initialValues={{
          accounttype: 'user'
        }}
      >
        <Form.Item<FieldType>
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: 'Please input your firstname!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: 'Please input your lastname!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Account Type"
          name="accounttype"
          rules={[{ required: true, message: 'Please select your account type!' }]}
        >
          <Select placeholder="Please Select">
            <Option value="user">Personal</Option>
            <Option value="admin">Business</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
