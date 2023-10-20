import { init } from '@tma.js/sdk'
import { SDKProvider, useLaunchParams, useSDK } from '@tma.js/sdk-react'
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react'
import { Box, ChakraProvider } from '@chakra-ui/react'

const Loader = ({ children }) => {
  const { didInit, components, error } = useSDK()
  const location = global?.window && window?.location
  console.log("LOCATION", { location, components })
  
  if (!didInit) {
    return <Box>SDK Not Init</Box>
  }

  if (error !== null) {
    return <Box>Something went wrong</Box>
  }

  if (components === null) {
    return <Box>Warming up SDK</Box>
  }

  return (
    <TonConnectUIProvider
      manifestUrl="https://tma-router.vercel.app/tonconnect-manifest.json" 
      actionsConfiguration={{
        twaReturnUrl: `https://t.me/xircus_test_bot${location?.pathname}`
      }}
      uiPreferences={{ theme: THEME.DARK }}>
      {children}
    </TonConnectUIProvider>
  )
  
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <SDKProvider>
          <Loader>
            <Component {...pageProps} />
          </Loader>
        </SDKProvider>
    </ChakraProvider>
  )
}

export default MyApp
