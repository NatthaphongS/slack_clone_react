import { Input } from 'antd';
import { Modal } from 'antd';
import { useState } from 'react';
import useChannel from '../custom-hooks/use-channel';

export default function ModalCreateChannelForm({
  isModalOpen,
  setIsModalOpen,
}) {
  const [input, setInput] = useState('');
  const { createChannel } = useChannel();
  const [isLoading, setIsLoading] = useState(false);
  const [isInputError, setIsInputError] = useState(false);

  const submitForm = async () => {
    try {
      setIsLoading(true);
      if (input.trim() === '') {
        return setIsInputError(true);
      }
      const newChannel = await createChannel(input);
      console.log(newChannel);
      setIsModalOpen(false);
      setInput('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Input channel name"
      open={isModalOpen}
      onOk={() => submitForm()}
      onCancel={() => setIsModalOpen(false)}
      okButtonProps={{ loading: isLoading }}
    >
      <Input
        placeholder="channel name"
        value={input}
        onChange={(e) => {
          setIsInputError(false);
          setInput(e.target.value);
        }}
        status={isInputError ? 'error' : ''}
      />
    </Modal>
  );
}
