import { Button, Form, Input } from 'antd';
import useAuth from '../custom-hooks/use-auth';
import { useState } from 'react';
import { MessageContainer } from './RegisterForm';
import { Alert } from 'antd';

export default function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState();
  const [errorMessage, setErrorMessage] = useState([]);
  const onFinish = async (values) => {
    // console.log('Success:', values);
    try {
      setIsLoading(true);
      const res = await login(values);
      if (res?.error) {
        return setErrorMessage(res.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <MessageContainer>
        {errorMessage.length > 0 &&
          errorMessage?.map((error, index) => (
            <Alert withDes key={index} message={error} type="error" />
          ))}
      </MessageContainer>

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
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Sign-In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
