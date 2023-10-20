import { Center, Container, Heading } from "@chakra-ui/react"
import { TonConnectButton, useTonWallet, useTonConnectUI, useTonAddress } from "@tonconnect/ui-react"

export default function Home() {
  return (
    <Container>
      <Center>
        <Heading>Xircus {`<>`} TON Mini Apps</Heading>
      </Center>
    </Container>
  )
}
