import { useContext } from 'react';
import { ChannelContext } from '../contexts/ChannelContext';

export default function useChannel() {
  return useContext(ChannelContext);
}
