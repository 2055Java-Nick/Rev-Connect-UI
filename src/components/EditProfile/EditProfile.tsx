import React from 'react';
import { Form, Input, Button, Select } from 'antd'; // Import necessary components from Ant Design
import { Store } from 'antd/lib/form/interface'; // Import the correct type for form values
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import '../../styles/pages/EditProfile.css'; // Import the CSS file for styling
import logo from '../../assets/Revconnect.png'; // Import the logo image
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'; // Import the correct type for error info
import { FormData } from '../../types/user';

const { Option } = Select; // Destructure Option from Select for easier usage


const EditForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle form submission success
  const handleFinish = (values: Store) => {
    console.log('Success:', values); // Log the form values
    // Handle form submission for editing
    navigate(`/landing/${values.firstname}`); // Navigate to the profile page with the username as a parameter
  };
  
  // Function to handle form submission failure
  const handleFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo); // Log the error information
  };

  return (
    <div className="edit-form-container"> {/* Container for the edit form */}
      <img src={logo} alt="Logo" className="form-logo" /> {/* Display the logo image */}
      <Form
        name="edit"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={{
          accounttype: 'user' // Set default value for account type
        }}
        className="edit-form" // CSS class for styling the form
      >
        <Form.Item<FormData>
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: 'Please input your firstname!' }]}
          className="edit-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FormData>
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: 'Please input your lastname!' }]}
          className="edit-form-field"
        >
          <Input />
        </Form.Item>

        {/* <Form.Item<FormData>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className="edit-form-field"
        >
          <Input />
        </Form.Item> */}

        <Form.Item<FormData>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="edit-form-field"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FormData>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          className="edit-form-field"
        >
          <Input />
        </Form.Item>

        <Form.Item<FormData>
          label="Account Type"
          name="accounttype"
          rules={[{ required: true, message: 'Please select your account type!' }]}
          className="edit-form-field"
        >
          <Select placeholder="Please Select">
            <Option value="user">Personal</Option>
            <Option value="admin">Business</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }} className="edit-form-field">
          <Button type="primary" htmlType="submit" className="edit-form-button">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditForm; // Export the EditForm component as default