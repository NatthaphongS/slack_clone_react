import styled from 'styled-components';
import ChannelLayout from '../channel/ChannelLayout';
import HomeHeader from './HomeHeader';
import HomeSideBar from './HomeSideBar';
import { Outlet } from 'react-router-dom';

const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const MainContainer = styled.div`
  display: flex;
  flex: 1;
`;

export default function HomeLayout() {
  return (
    <HomeContainer>
      <HomeHeader />
      <MainContainer>
        <HomeSideBar />
        <Outlet />
      </MainContainer>
    </HomeContainer>
  );
}
