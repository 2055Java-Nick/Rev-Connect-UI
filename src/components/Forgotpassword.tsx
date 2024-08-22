import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, notification } from 'antd';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const onFinish = async () => {
    try {
      const response = await axios.post('http://192.168.1.72:8080/home/forgotPassword', { email });
      notification.success({
        message: 'Success',
        description: response.data,
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Email not found. Please try again.',
      });
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Forgot Password</h2>
      <Form
        name="forgotPassword"
        style={{ maxWidth: 400, margin: '0 auto' }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
