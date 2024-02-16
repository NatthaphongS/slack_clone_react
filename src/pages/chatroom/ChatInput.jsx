import { SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';
import useChat from '../../custom-hooks/use-chat';
import { Space } from 'antd';

export default function ChatInput() {
  const { sendMessage } = useChat();
  const [message, setMessage] = useState('');

  const send = (e) => {
    e.preventDefault();
    // console.log('55');
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };
  return (
    <form onSubmit={send}>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button type="primary" onClick={send}>
          <SendOutlined />
        </Button>
      </Space.Compact>
    </form>
  );
}
