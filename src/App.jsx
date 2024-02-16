import { ConfigProvider } from 'antd';
import Loading from './components/Loading';
import Route from './router/Router';
import useAuth from './custom-hooks/use-auth';

function App() {
  const { initialLoading } = useAuth();
  if (initialLoading) {
    return <Loading />;
  }
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#76317c',
            colorBgContainer: '#fff',
          },
          components: {
            Alert: {
              defaultPadding: '4px 12px',
            },
          },
        }}
      >
        <Route />
      </ConfigProvider>
    </>
  );
}

export default App;
