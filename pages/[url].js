import { Box, Button, Center, Container, Divider, Heading, HStack, IconButton, Spacer, useColorMode } from "@chakra-ui/react"
import { TonConnectButton, useTonWallet, useTonConnectUI, useTonAddress } from "@tonconnect/ui-react"
import { useRouter } from 'next/router'
import { TbSun, TbMoon } from 'react-icons/tb'
import { useViewport } from "@tma.js/sdk-react"

export default function Home() {
  const router = useRouter()
	const [ton] = useTonConnectUI()
	const wallet = useTonWallet()
  const address = useTonAddress()
  const { colorMode, toggleColorMode } = useColorMode()
  const viewport = useViewport()

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

  const handleExpand = () => {
    console.log("WEBAPP", viewport)
    viewport?.expand()
    console.log("HEIGHT", viewport?.height)
    console.log("WIDTH", viewport?.width)
    console.log("EXPANDED", viewport?.isExpanded)
    console.oog("STABLE", viewport?.stableHeight)
    console.oog("STABLE STATUS", viewport?.isStable)    
  }

  return (
    <>
      <Box bgGradient="linear(to-r, blue.500, purple.500, purple.500)" py={4} color="#fff">
        <Container>
          <HStack>
            <Heading>{router?.query?.url}</Heading>
            <Spacer />
            <TonConnectButton />
            <IconButton 
              icon={colorMode == 'light' ? <TbMoon /> : <TbSun />} 
              onClick={toggleColorMode} rounded="full" />
          </HStack>
        </Container>
      </Box>
      <Container>
      { address && <div>Wallet Address: {address}</div> }
      <Box p={6}>
        <Button onClick={handleExpand}>Expand</Button>
      </Box>
      <Box h={200} />
      <Center>
        <Heading size="sm" mb={4}>Xircus {`<>`} TON Mini Apps</Heading>
      </Center>  
    </Container>    
    </>


  )
}
