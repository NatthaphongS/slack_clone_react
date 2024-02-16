import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { Button } from 'antd';

const CenterLayout = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
`;

const FormLayout = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.4);
  margin-bottom: 6rem;
  width: 80vw;
  max-width: 400px;
`;

const SlackIcon = styled.div`
  background-image: url('/slack_icon.png');
  background-size: cover;
  width: 150px;
  height: 150px;
`;

const SelectLogIn = styled(Button)`
  border-radius: 5px 0 0 5px;
`;
const SelectRegister = styled(Button)`
  border-radius: 0 5px 5px 0;
`;

const BottonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
`;

export default function WelcomePage() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <CenterLayout>
      <Title>Welcomt to Slate</Title>
      <SlackIcon />
      <FormLayout>
        <BottonContainer>
          <SelectLogIn
            onClick={() => setIsLoginForm(true)}
            type={isLoginForm ? 'primary' : 'default'}
          >
            Login
          </SelectLogIn>
          <SelectRegister
            onClick={() => setIsLoginForm(false)}
            type={isLoginForm ? 'default' : 'primary'}
          >
            Register
          </SelectRegister>
        </BottonContainer>
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
      </FormLayout>
    </CenterLayout>
  );
}
