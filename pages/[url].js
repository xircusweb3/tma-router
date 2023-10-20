import { Box, Button, Center, Container, Divider, Heading, HStack, IconButton, List, Spacer, useColorMode, VStack } from "@chakra-ui/react"
import { TonConnectButton, useTonWallet, useTonConnectUI, useTonAddress } from "@tonconnect/ui-react"
import { useRouter } from 'next/router'
import { TbSun, TbMoon } from 'react-icons/tb'
import { useBackButton, useClosingBehaviour, useHapticFeedback, useInitData, useMainButton, useQRScanner, useViewport, useWebApp } from "@tma.js/sdk-react"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  const url = router?.query?.url
	const [ton] = useTonConnectUI()
  const address = useTonAddress()
  const { colorMode, toggleColorMode } = useColorMode()
  const viewport = useViewport()
  const app = useWebApp()
  const scanner = useQRScanner()
  const mainButton = useMainButton()
  const haptic = useHapticFeedback()
  const initData = useInitData()
  const closing = useClosingBehaviour()
  const backButton = useBackButton()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    viewport?.expand()
    // backButton?.hide()
    closing?.enableConfirmation()
  }, [])

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
    console.log("HEIGHT", viewport?.height)
    console.log("WIDTH", viewport?.width)
    console.log("EXPANDED", viewport?.isExpanded)
    console.log("STABLE", viewport?.stableHeight)
    console.log("STABLE STATUS", viewport?.isStable)    
  }

  const handleCloseApp = () => {
    haptic?.impactOccurred('heavy')
    app?.close()
  }
  
  const handleOpenScan = async() => {
    haptic?.impactOccurred('medium')
    const data = await scanner?.open()
    console.log("QR DATA", data)
  }

  console.log("INIT DATA", initData, mainButton)

  const gradients = {
    'tribalzmarkettest': 'linear(to-r, blue.500, purple.500, purple.500)',
    'basetonnfts': 'linear(to-r, green.500, cyan.500, cyan.500)'
  }

  return (
    <>
      <Box bgGradient={gradients[url]} py={4} color="#fff">
        <Container>
          <HStack>
            <Spacer />
            <TonConnectButton />
            <IconButton 
              icon={colorMode == 'light' ? <TbMoon /> : <TbSun />} 
              onClick={toggleColorMode} rounded="full" />
          </HStack>
        </Container>
      </Box>
      <Container>
        { address && <Box>TON Address: {address}</Box> }
        <VStack py={6} spacing={2}>
          <Heading>{url}</Heading>
          { initData && <Box>Username: @{initData?.user?.username}</Box> }
          <Button size="lg" w="full" onClick={handleOpenScan}>Open Scanner</Button>
          <Button size="lg" w="full" onClick={handleCloseApp}>Close</Button>
        </VStack>
        <Box h={200} />
        <Center>
        <Heading size="sm" mb={4}>Xircus {`<>`} TON Mini Apps</Heading>
      </Center>  
    </Container>    
    </>


  )
}
