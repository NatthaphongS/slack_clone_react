import { Button, Form, Input } from 'antd';
import useAuth from '../custom-hooks/use-auth';
import { useState } from 'react';
import { Alert } from 'antd';
import styled from 'styled-components';

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMassage] = useState([]);
  const [successMessage, setSuccessMessage] = useState([]);

  const { register } = useAuth();

  const onFinish = async (values) => {
    // console.log('Success:', values);
    setIsLoading(true);
    setErrorMassage([]);
    setSuccessMessage([]);
    delete values.confirm;
    try {
      const res = await register(values);
      console.log('res------', res);
      if (res?.error) {
        return setErrorMassage(res.error);
      }
      setSuccessMessage(["Register Successful. Let's login!!"]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const checkPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error('The new password that you entered do not match!')
      );
    },
  });

  return (
    <>
      <MessageContainer>
        {errorMessage.length > 0 &&
          errorMessage?.map((error, index) => (
            <Alert withDes key={index} message={error} type="error" />
          ))}
        {successMessage.length > 0 &&
          successMessage?.map((success, index) => (
            <Alert key={index} message={success} type="success" />
          ))}
      </MessageContainer>

      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        // style={{ width: 80 }}
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
              message: 'Please input your email',
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            checkPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Sign-Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
