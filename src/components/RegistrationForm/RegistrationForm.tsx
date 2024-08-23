import React from 'react';
import { Form, Input, Button, Select, Checkbox } from 'antd';
import { Store } from 'antd/lib/form/interface'; // Import the correct type for form values
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/RegistrationForm.css'; // Correct the import path
import logo from '../../assets/Revconnect.png'; // Import the image
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'; // Import the correct type for error info



const { Option } = Select;// Destructure Option from Select for easier usage

export type FieldType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
  email?: string;
  accounttype?: string;
  remember?: string;
};

// Function to clear user information from local storage
onLoginPage();
function onLoginPage(){
  localStorage.removeItem("userInfo");
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle form submission success
  const handleFinish = (values: Store) => {
    console.log('Success:', values);
    // Handle form submission
    navigate(`/landing/${values.firstname}`); // Navigate to the landing page with the firstname as a parameter
  };
  
  // Function to handle form submission failure
  const handleFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="registration-form-container">
      <img src={logo} alt="Logo" className="form-logo" /> {/* Add the image */}
      <Form
        name="registration"
        onFinish={handleFinish} // Callback for successful form submission
        onFinishFailed={handleFinishFailed}
        initialValues={{
          accounttype: 'user' // Set default value for account type
        }}
        className="registration-form" // CSS class for styling the form
      >
        <Form.Item<FieldType>
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: 'Please input your firstname!' }]} // Validation rules
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: 'Please input your lastname!' }]} // Validation rules
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]} // Validation rules
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]} // Validation rules
          className="registration-form-field"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]} // Validation rules
          className="registration-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Account Type"
          name="accounttype"
          rules={[{ required: true, message: 'Please select your account type!' }]} // Validation rules
          className="registration-form-field"
        >
          <Select placeholder="Please Select"> {/* Select field for account type */}
            <Option value="user">Personal</Option>
            <Option value="admin">Business</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          name="remember" // Name of the checkbox field
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

export default RegistrationForm; // Export the RegistrationForm component as default