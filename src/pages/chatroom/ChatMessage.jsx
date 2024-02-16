import styled from 'styled-components';
import useChat from '../../custom-hooks/use-chat';
import useAuth from '../../custom-hooks/use-auth';
import { Space } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { useEffect } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const MessageUl = styled.ul`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const MyMessage = styled.li`
  display: flex;
  flex-direction: column;
  /* justify-content: start; */
  align-items: end;
  padding: 0.2rem 0.2rem 0.2rem 0;
  gap: 0.2rem;
`;
const OtherMessage = styled.li`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 0.2rem;
  width: 100%;
  .authorName {
    color: #757575;
    line-height: 13px;
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 1rem;
    padding: 0 0.3rem;
  }
`;

const MyMessageContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 4px;
  width: 100%;
  .message {
    max-width: 60%;
    background-color: #d6d6d6;
    border-radius: 1rem;
    padding: 0.3rem 0.6rem;
    font-size: 1rem;
    overflow: hidden;
  }
  .time {
    font-size: 0.8rem;
    color: #b1b1b1;
  }
`;

const OtherMessageContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 4px;
  width: 100%;
  .message {
    max-width: 60%;
    background-color: var(--primary);
    color: white;
    border-radius: 1rem;
    padding: 0.3rem 0.6rem;
    font-size: 1rem;
    text-overflow: clip;
    overflow: hidden;
  }
  .time {
    font-size: 0.8rem;
    color: #b1b1b1;
  }
`;

export default function ChatMessage() {
  const { messages } = useChat();
  const { authUser } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Function to scroll to the bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const combinedMessage = messages.reduce((acc, message, index, orgArray) => {
    if (index > 0 && message.authorId === orgArray[index - 1].authorId) {
      acc[acc.length - 1].contents.push({
        message: message.content,
        createdAt: message.createdAt,
        id: message.id,
      });
    } else {
      acc.push({
        ...message,
        contents: [
          {
            message: message.content,
            createdAt: message.createdAt,
            id: message.id,
          },
        ],
      });
    }
    return acc;
  }, []);
  // console.log(messages);
  // console.log(combinedMessage);

  return (
    <MessageUl>
      {combinedMessage.map((msg, index) => {
        if (msg.author.id === authUser.id) {
          return (
            <MyMessage key={msg.id} autoFocus={true}>
              {msg.contents.map((content) => (
                <MyMessageContainer key={content.id}>
                  <div className="time">
                    {timeAgo.format(
                      new Date(content.createdAt),
                      'mini-minute-now'
                    )}
                  </div>
                  <div className="message" ref={messagesEndRef}>
                    {content.message}
                  </div>
                </MyMessageContainer>
              ))}
            </MyMessage>
          );
        }
        return (
          <Space.Compact
            key={msg.id}
            style={{ width: '100%', gap: '3px', padding: '0.2rem 0' }}
            autoFocus={true}
          >
            <Avatar
              size={'large'}
              icon={<UserOutlined />}
              style={{ backgroundColor: '#757575' }}
            />
            <OtherMessage key={msg.id}>
              <div className="authorName">{msg.author.name}</div>
              {msg.contents.map((content) => (
                <OtherMessageContainer>
                  <div
                    className="message"
                    ref={messagesEndRef}
                    key={content.id}
                  >
                    {content.message}
                  </div>
                  <div className="time">
                    {timeAgo.format(
                      new Date(content.createdAt),
                      'mini-minute-now'
                    )}
                  </div>
                </OtherMessageContainer>
              ))}
            </OtherMessage>
          </Space.Compact>
        );
      })}
    </MessageUl>
  );
}
