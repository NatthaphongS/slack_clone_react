import { ConfigProvider } from 'antd';
import { Input } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

export default function HomeHeader() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <Container>
      <Input.Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ width: 400 }}
        size="middle"
      />
    </Container>
  );
}
