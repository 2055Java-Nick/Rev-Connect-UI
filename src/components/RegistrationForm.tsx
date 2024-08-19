import React from 'react';
//import axios from 'axios';  
import { Form, Input, Button, Select } from 'antd';
//import type { FormProps } from 'antd';
import { onFinish, onFinishFailed } from '../formHandlers';

const { Option } = Select;

export type FieldType = {
  firstName?: string;
  lastName?: string;
  username?: string;
  userPwd?: string;
  confirmPassword?: string;
  email?: string;
  isBusiness?: boolean;
};

// clean user infomation
onLoginPage();
function onLoginPage(){
  localStorage.removeItem("userInfo");
}

const RegistrationForm: React.FC = () => {
  
  return (
    <Form
      name="registration"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item <FieldType>
        label="Firstname"
        name="firstName"
        rules={[{ required: true, message: 'Please input your firstname!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item <FieldType>
        label="Lastname"
        name="lastName"
        rules={[{ required: true, message: 'Please input your lastname!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item <FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item <FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item <FieldType>
        label="Password"
        name="userPwd"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item <FieldType>
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['userPwd']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('userPwd') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item <FieldType>
        label="Account Type"
        name="isBusiness"
        rules={[{ required: true, message: 'Please select your account type!' }]}
      >
        <Select placeholder = "Please Select">
          <Option value="user">Personal</Option>
          <Option value="admin">Business</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;