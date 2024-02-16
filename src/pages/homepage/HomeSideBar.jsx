import {
  UserOutlined,
  WechatOutlined,
  PlusOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Badge } from 'antd';
import { Avatar } from 'antd';
import styled from 'styled-components';
import useAuth from '../../custom-hooks/use-auth';
import useChannel from '../../custom-hooks/use-channel';
import { useState } from 'react';
import ModalCreateChannelForm from '../../components/ModalCreateChannelForm';
import { useNavigate } from 'react-router-dom';

const SideBarContainer = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
`;

export default function HomeSideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { channelLists } = useChannel();
  // console.log(authUser);
  // console.log(channelLists);
  return (
    <SideBarContainer>
      <ListContainer>
        <Tooltip title="Home" placement="right">
          <Avatar
            style={{ cursor: 'pointer' }}
            size={'large'}
            shape="square"
            icon={<HomeOutlined />}
            onClick={() => navigate(`/home`)}
          />
        </Tooltip>
        {channelLists.map((el) => (
          <Tooltip
            key={el.channel.id}
            title={el.channel.name}
            placement="right"
          >
            <Avatar
              style={{ cursor: 'pointer' }}
              size={'large'}
              shape="square"
              icon={<WechatOutlined />}
              onClick={() => navigate(`/home/channel/${el.channel.id}`)}
            />
          </Tooltip>
        ))}

        <Tooltip title="Add channel" placement="right">
          <Avatar
            style={{ cursor: 'pointer' }}
            size={'large'}
            shape="square"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          />
          <ModalCreateChannelForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Tooltip>
      </ListContainer>
      <ListContainer>
        <Tooltip title={authUser.name} placement="right">
          <Badge dot status="success">
            <Avatar
              style={{ cursor: 'pointer' }}
              size={'large'}
              shape="square"
              icon={<UserOutlined />}
            />
          </Badge>
        </Tooltip>
      </ListContainer>
    </SideBarContainer>
  );
}
