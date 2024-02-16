import { Layout } from 'antd';
import styled from 'styled-components';
import useChat from '../../custom-hooks/use-chat';
import { HeroContainer, HeroText } from '../homepage/HomeHero';
import { Spinner } from '../../components/Loading';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const { Header, Content, Footer } = Layout;

const StyledLayout = styled(Layout)`
  background-color: white;
  height: calc(100vh - 50px);
`;

const FixHeader = styled(Header)`
  padding: 0 1rem;
  background-color: #fff;
  border-bottom: 1px solid #b1b1b1;
  height: 45px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: bolder;
  font-size: 1.2rem;
`;

const StyledContent = styled.div`
  flex: 1;
  /* background-color: aquamarine; */
  margin: 0 0.2rem;
  // display: flex;
  // flex-direction: column;
  justify-content: flex-end;
  overflow-y: scroll;
`;

const StyledFooter = styled(Footer)`
  padding: 1rem;
  background-color: #fff;
`;

export default function ChatRoomLayout() {
  const { chatRoomDetail, isLoading } = useChat();
  if (isLoading) {
    return (
      <HeroContainer style={{ borderRadius: '0' }}>
        <HeroText>Loading Chat...</HeroText>
        <Spinner />
      </HeroContainer>
    );
  }
  return (
    <StyledLayout>
      <FixHeader>{chatRoomDetail.name}</FixHeader>
      <StyledContent>
        <ChatMessage />
      </StyledContent>
      <StyledFooter>
        <ChatInput />
      </StyledFooter>
    </StyledLayout>
  );
}
