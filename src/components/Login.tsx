import React from 'react';
import axios from 'axios';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import logo from '../assets/Revconnect.png';
import { Link } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

// clean user infomation
onLoginPage();
function onLoginPage(){
  localStorage.removeItem("userInfo");
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

  axios.post("http://192.168.1.72:8080/home/login", values).then((response) => {
    console.log(response.status, response.data);
       //login success
       let userInfo = response.data;
       //console.log("userInfo.username",userInfo.username)
       // get return by Json file for user info
       localStorage.setItem("token",userInfo.token);
       // give a alert to User
       alert("login success,welcome "+ userInfo.username)
       
       // transfer tab to Revature
       //window.location.href="https://revature.com/"
  }).catch(e => {
      //login faild 
      alert("Incorrect username or password, Please try again!")  
  });
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);

};

const App: React.FC = () => (

<div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img
        src={logo} 
        alt="Logo"
        style={{
          width: '238px',  
          height: 'auto',   
          borderRadius: '0px',  
        }}
      />
    


  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input placeholder = "Enter your email or Username"/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
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
        Submit
      </Button>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Link to="/forgot-password">Forgot Password?</Link> {/* Forgot Password Link */}
      </Form.Item>
    </Form>
  </div>
);


export default App;