import useChannel from '../../custom-hooks/use-channel';
import { HeroContainer, HeroText, IconSlate } from '../homepage/HomeHero';

export default function ChatRoomHero() {
  const { channelDetail } = useChannel();
  return (
    <HeroContainer style={{ borderRadius: 0 }}>
      <IconSlate />
      <HeroText>Welcome to</HeroText>
      <HeroText>{channelDetail.name}</HeroText>
    </HeroContainer>
  );
}
