import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import axios from '../config/axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import useAuth from '../custom-hooks/use-auth';

const socket = io('http://localhost:3000');

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState('');

  const [chatRoomDetail, setChatRoomDetail] = useState({});
  const { authUser } = useAuth();
  const { chatRoomId } = useParams();

  // console.log(chatRoomDetail);

  useEffect(() => {
    if (currentRoomId !== '' && currentRoomId !== chatRoomId) {
      socket.emit('leaveRoom', currentRoomId);
    }
    axios
      .get(`/chatroom/${chatRoomId}`)
      .then((res) => {
        socket.emit('joinRoom', res.data.id);
        setCurrentRoomId(res.data.id);
        setChatRoomDetail(res.data);
        setMessages(res.data.messages);
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    socket.on('newMessage', (message) => {
      console.log('Useeffect', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [chatRoomId]);

  const sendMessage = (message) => {
    socket.emit('sendMessage', {
      chatRoomId: chatRoomDetail.id,
      message,
      userId: authUser.id,
    });
  };

  return (
    <ChatContext.Provider
      value={{
        isLoading,
        setIsLoading,
        chatRoomDetail,
        sendMessage,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
