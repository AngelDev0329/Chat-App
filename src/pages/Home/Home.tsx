import { Sidebar } from '../../components'
import { Wrapper, HomeWrapper, Text, Image } from './style'

export function Home() {
  return (
    <Wrapper>
      <Sidebar />
      <HomeWrapper>
        <Image src="https://cdn-icons-png.flaticon.com/512/763/763704.png" />
        <Text>Select a conversation to start chatting.</Text>
      </HomeWrapper>
    </Wrapper>
  )
}
