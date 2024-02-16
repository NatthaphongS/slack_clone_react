import React from 'react';
import { Layout, theme } from 'antd';
import { ConfigProvider } from 'antd';
import ChannelSideBar from './ChannelSideBar';
import { useEffect } from 'react';
import useChannel from '../../custom-hooks/use-channel';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Spinner } from '../../components/Loading';
import { HeroContainer, HeroText } from '../homepage/HomeHero';
import { Outlet } from 'react-router-dom';

export default function ChannelLayout() {
  const [isChannelLoading, setIsChannelLoading] = useState(true);
  const { getChannelDetail } = useChannel();
  const { channelId } = useParams();
  useEffect(() => {
    setIsChannelLoading(true);
    getChannelDetail(channelId)
      .then((res) => {
        // console.log(res);
        setIsChannelLoading(false);
      })
      .catch((err) => console.log(err));
  }, [channelId]);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  if (isChannelLoading) {
    return (
      <HeroContainer>
        <HeroText>Loading channel...</HeroText>
        <Spinner />
      </HeroContainer>
    );
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: '#ffffff0',
          },
          Menu: {
            itemBg: '#ffffff0',
            itemHoverBg: '#ffffff52',
            itemSelectedBg: colorPrimary,
            itemSelectedColor: '#fff',
            colorText: '#fff',
            itemHeight: 30,
            groupTitleColor: '#fff',
          },
        },
      }}
    >
      <Layout
        style={{
          borderTopLeftRadius: '1rem',
          overflow: 'hidden',
        }}
      >
        <ChannelSideBar />
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
}
