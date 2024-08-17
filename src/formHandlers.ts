import axios from 'axios';
import { FormProps } from 'antd';
import { FieldType } from './components/RegistrationForm';
import { useNavigate } from 'react-router-dom';

export const onFinish = (navigate: ReturnType<typeof useNavigate>): FormProps<FieldType>['onFinish'] => async (values) => {
  console.log('Form Data:', values);


  try {
    const response = await axios.post('http://localhost:5000/register', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Success:', response.data);
      navigate(`/welcome/${values.firstname}`);
    } else {
      console.error('Unexpected response:', response);
    }
  } catch (error) {
    console.error('Failed to submit:', error);
  }
};

export const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.error('Failed:', errorInfo);
};