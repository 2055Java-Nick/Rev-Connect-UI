import React from 'react';
import { Form, Input, Button, Select, Checkbox } from 'antd';
import { Store } from 'antd/lib/form/interface'; // Import the correct type for form values
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/RegistrationForm.css'; // Correct the import path
import logo from '../../assets/Revconnect.png'; // Import the image
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'; // Import the correct type for error info
import { FormData } from '../../types/user';

const { Option } = Select;



// clean user information
onLoginPage();
function onLoginPage(){
  localStorage.removeItem("userInfo");
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const handleFinish = (values: Store) => {
    console.log('Success:', values);
    // Handle form submission
    navigate(`/users/:id/`); // Navigate to the landing page
  };
  
  const handleFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="registration-form-container">
      <img src={logo} alt="Logo" className="form-logo" /> {/* Add the image */}
      <Form
        name="registration"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={{
          accounttype: 'user'
        }}
        className="registration-form"
      >
        <Form.Item<FormData>
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: 'Please input your firstname!' }]}
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FormData>
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: 'Please input your lastname!' }]}
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FormData>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FormData>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="registration-form-field"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FormData>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FormData>
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

        <Form.Item<FormData>
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