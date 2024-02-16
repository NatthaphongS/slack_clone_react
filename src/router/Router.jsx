import { createBrowserRouter } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import { RouterProvider } from 'react-router-dom';
import RedirectIfLogin from './RedirectIfLogin';
import RedirectIfNotLogin from './RedirectIfNotLogin';
import ChannelContextProvider from '../contexts/ChannelContext';
import ChannelLayout from '../pages/channel/ChannelLayout';
import HomeLayout from '../pages/homepage/HomeLayout';
import HomeHero from '../pages/homepage/HomeHero';
import ChatRoomLayout from '../pages/chatroom/ChatRoomLayout';
import ChatRoomHero from '../pages/chatroom/ChatRoomHero';
import ChatContextProvider from '../contexts/ChatContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RedirectIfLogin>
        <WelcomePage />
      </RedirectIfLogin>
    ),
  },
  {
    path: '/home',
    element: (
      <RedirectIfNotLogin>
        <ChannelContextProvider>
          <HomeLayout />
        </ChannelContextProvider>
      </RedirectIfNotLogin>
    ),
    children: [
      { path: '', element: <HomeHero /> },
      {
        path: 'channel/:channelId',
        element: <ChannelLayout />,
        children: [
          { path: '', element: <ChatRoomHero /> },
          {
            path: 'chatRoom/:chatRoomId',
            element: (
              <ChatContextProvider>
                <ChatRoomLayout />
              </ChatContextProvider>
            ),
          },
        ],
      },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
