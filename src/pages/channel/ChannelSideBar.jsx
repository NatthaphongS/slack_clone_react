import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  NumberOutlined,
  PlusOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import useChannel from '../../custom-hooks/use-channel';
import styled from 'styled-components';
import { ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import ModalAddMemberForm from '../../components/ModalAddMemberForm';
import { useState } from 'react';
import ModalCreateRoomForm from '../../components/ModalCreateRoomForm';

const { Sider } = Layout;

// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

const ChannelName = styled.div`
  margin: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function ChannelSideBar() {
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  console.log(isRoomModalOpen);
  const { channelDetail } = useChannel();
  const navigate = useNavigate();
  console.log(channelDetail);

  const channelLists = channelDetail.chatRooms.map((chatroom) => ({
    key: `${chatroom.id}`,
    label: `${chatroom.name}`,
    icon: React.createElement(NumberOutlined),
    onClick: () => {
      navigate(`/home/channel/${channelDetail.id}/chatRoom/${chatroom.id}`);
    },
  }));
  channelLists.push({
    key: `add room`,
    label: `Add room`,
    icon: React.createElement(PlusOutlined),
    onClick: () => {
      setIsRoomModalOpen(true);
    },
  });
  const memberLists = channelDetail.channelMembers.map((member) => ({
    key: `${member.user.id}`,
    label: member.user.name,
    icon: React.createElement(UserOutlined),
  }));
  memberLists.push({
    key: `add member`,
    label: `Invite people`,
    icon: React.createElement(UserAddOutlined),
    onClick: () => {
      setIsMemberModalOpen(true);
    },
  });

  return (
    <Sider
      style={{
        backgroundColor: '#00000045',
      }}
      breakpoint="sm"
      collapsedWidth="0"
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
    >
      <div className="demo-logo-vertical" />
      <ChannelName>{channelDetail.name}</ChannelName>
      <Menu
        // theme="dark"
        style={{ overflow: 'hidden' }}
        mode="inline"
        defaultOpenKeys={['1']}
        items={[{ key: '1', label: 'Chatroom', children: channelLists }]}
      />
      {isRoomModalOpen && (
        <ModalCreateRoomForm
          setIsRoomModalOpen={setIsRoomModalOpen}
          isRoomModalOpen={isRoomModalOpen}
        />
      )}
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorText: '#fff',
            },
          },
        }}
      >
        <Menu
          // theme="dark"
          // style={{ backgroundColor: '#ffffff0' }}
          mode="inline"
          items={[{ key: '2', label: 'Member', children: memberLists }]}
        />
      </ConfigProvider>
      {isMemberModalOpen && (
        <ModalAddMemberForm
          setIsMemberModalOpen={setIsMemberModalOpen}
          isMemberModalOpen={isMemberModalOpen}
        />
      )}
    </Sider>
  );
}
