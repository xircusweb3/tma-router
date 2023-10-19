import { Box, Button, Container, Divider, Heading, HStack, Spacer } from "@chakra-ui/react"
import { TonConnectButton, useTonWallet, useTonConnectUI, useTonAddress } from "@tonconnect/ui-react"
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
	const [ton] = useTonConnectUI()
	const wallet = useTonWallet()
  const address = useTonAddress()

  const handleSendTx = () => {
    ton?.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 600, // unix epoch seconds
      messages: [
        {
          address: '0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F',
          amount: '20000000',
        },
        {
          address: '0:E69F10CC84877ABF539F83F879291E5CA169451BA7BCE91A37A5CED3AB8080D3',
          amount: '60000000',
        },
      ],
    })
  }

  const handleDisconnect = () => {
    ton?.disconnect()
  }

  const handleConnect = () => {
    ton?.connectWallet()
  }

  return (
    <Container>
      <HStack py={4}>
        <Spacer />
        <TonConnectButton />
      </HStack>
      <Heading mb={4}>{router?.query?.url}</Heading>
      { address && <div>Wallet Address: {address}</div> }
      <Button onClick={handleDisconnect}>Disconnect</Button>
      {
        wallet
        ? <Button onClick={handleSendTx}>Send Transaction</Button>
        : <Button onClick={handleConnect}>Connect</Button>
      }
      <Heading size="sm" mb={4}>Xircus {`<>`} TON Mini Apps</Heading>
    </Container>
  )
}
