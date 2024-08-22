import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const location = useLocation();

  // Extract token from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const handleSubmit = async () => {
    if (!token) {
      message.error('Invalid or missing reset token.');
      return;
    }

    try {
      const response = await axios.put(`http://192.168.1.72:8080/home/resetPassword?token=${token}`, {
        newPassword: password,
      });
      message.success('Password has been reset successfully');
    } catch (error) {
      message.error('Invalid token or there was an issue resetting your password.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Reset Your Password</h2>
      <Form onFinish={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your new password!' }]}
        >
          <Input.Password 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password" 
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
