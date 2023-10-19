import { SDKProvider } from '@tma.js/sdk-react';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

function MyApp({ Component, pageProps }) {
  return (
    <TonConnectUIProvider 
      manifestUrl="https://tma-router.vercel.app/tonconnect-manifest.json" 
      uiPreferences={{ theme: THEME.DARK }}> 
      <SDKProvider>
        <Component {...pageProps} />
      </SDKProvider>
    </TonConnectUIProvider>
  )
}

export default MyApp
