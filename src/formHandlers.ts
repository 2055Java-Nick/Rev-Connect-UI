import axios from 'axios';
import { FormProps } from 'antd';
import { FormData } from './types/user.ts';
import { useNavigate } from 'react-router-dom';

export const onFinish = (navigate: ReturnType<typeof useNavigate>): FormProps<FormData>['onFinish'] => async (values) => {
  console.log('Form Data:', values);


  try {
    const response = await axios.post('http://localhost:8080/api/register', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Success:', response.data);
      navigate(`/landing/${values.firstname}`);
    } else {
      console.error('Unexpected response:', response);
    }
  } catch (error) {
    console.error('Failed to submit:', error);
  }
};

export const onFinishFailed: FormProps<FormData>['onFinishFailed'] = (errorInfo) => {
  console.error('Failed:', errorInfo);
};