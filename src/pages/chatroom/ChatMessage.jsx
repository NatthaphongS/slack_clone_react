import useChat from '../../custom-hooks/use-chat';

export default function ChatMessage() {
  const { messages } = useChat();
  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>
    </div>
  );
}
