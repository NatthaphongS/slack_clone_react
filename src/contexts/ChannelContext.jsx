import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import axios from '../config/axios';

export const ChannelContext = createContext();

export default function ChannelContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [channelLists, setChannelLists] = useState([]);
  const [channelDetail, setChannelDetail] = useState({});
  // console.log(channelLists);
  // console.log(channelDetail);

  useEffect(() => {
    axios
      .get('/channel/mychannels')
      .then((res) => setChannelLists(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const createChannel = async (name) => {
    const res = await axios.post('/channel/create', { name });
    const newChannel = { channel: { id: res.data.id, name: res.data.name } };
    setChannelLists([...channelLists, newChannel]);
    return res.data;
  };

  const getChannelDetail = async (channelId) => {
    const res = await axios.get(`/channel/${channelId}`);
    setChannelDetail(res.data);
  };

  const addMember = async (inviteEmail) => {
    try {
      const res = await axios.post(`/channel/adduser/`, {
        email: inviteEmail,
        channelId: channelDetail.id,
      });
      console.log(res);
      const newChannelDetail = { ...channelDetail };
      newChannelDetail.channelMembers.push(res.data);
      setChannelDetail(newChannelDetail);
    } catch (error) {
      return { error: error.response.data.message };
    }
  };
  const addRoom = async (roomName) => {
    try {
      const res = await axios.post(`/chatroom/create`, {
        name: roomName,
        channelId: channelDetail.id,
      });
      console.log(res);
      delete res.data.channelId;
      const newChannelDetail = { ...channelDetail };
      newChannelDetail.chatRooms.push(res.data);
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  return (
    <ChannelContext.Provider
      value={{
        getChannelDetail,
        channelLists,
        setChannelLists,
        isLoading,
        createChannel,
        channelDetail,
        setChannelDetail,
        addMember,
        addRoom,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
}
