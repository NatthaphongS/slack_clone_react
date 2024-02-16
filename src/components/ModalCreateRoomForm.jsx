import { Input } from 'antd';
import { Modal } from 'antd';
import { useState } from 'react';
import useChannel from '../custom-hooks/use-channel';
import { Alert } from 'antd';

export default function ModalCreateRoomForm({
  isRoomModalOpen: isModalOpen,
  setIsRoomModalOpen: setIsModalOpen,
}) {
  const [input, setInput] = useState('');
  const { addRoom } = useChannel();
  const [isLoading, setIsLoading] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = async () => {
    try {
      setIsLoading(true);
      if (input.trim() === '') {
        return setIsInputError(true);
      }
      const newChannel = await addRoom(input);
      if (newChannel?.error) {
        return setErrorMessage(newChannel.error);
      }
      console.log('first');
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
      title="Input room name"
      open={isModalOpen}
      onOk={() => submitForm()}
      onCancel={() => setIsModalOpen(false)}
      okButtonProps={{ loading: isLoading }}
    >
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          style={{ marginBottom: '0.5rem' }}
        />
      )}
      <Input
        placeholder="Room name"
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
