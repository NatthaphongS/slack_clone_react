import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-color: black;
  opacity: 0.8;
  z-index: 49;
`;
const Layout = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  width: 50%;
  aspect-ratio: 1/1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/slack_icon.png');
  animation: rotation 3s infinite linear;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading() {
  return (
    <>
      <Background></Background>
      <Layout>
        <Spinner />
      </Layout>
    </>
  );
}
