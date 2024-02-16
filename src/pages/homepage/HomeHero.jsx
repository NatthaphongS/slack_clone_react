import styled from 'styled-components';
import useAuth from '../../custom-hooks/use-auth';

export const HeroContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background-color: #00000083;
  border-radius: 1rem 0 0 0;
`;

export const HeroText = styled.h1`
  color: white;
  text-align: center;
`;

export const IconSlate = styled.div`
  width: 60%;
  aspect-ratio: 1/1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/slack_icon.png');
`;

export default function HomeHero() {
  const { authUser } = useAuth();
  return (
    <HeroContainer>
      <HeroText>Hello {authUser.name}</HeroText>
      <IconSlate />
      <HeroText>Let's kak slate together</HeroText>
    </HeroContainer>
  );
}
