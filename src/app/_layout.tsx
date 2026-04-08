import '../global.css'

import { Slot } from 'expo-router'
import { AppIdentity, createSolanaDevnet, MobileWalletProvider } from '@wallet-ui/react-native-kit'

const cluster = createSolanaDevnet()
const identity: AppIdentity = { name: 'Solana Mobile App' }

export default function RootLayout() {
  return (
    <MobileWalletProvider cluster={cluster} identity={identity}>
      <Slot />
    </MobileWalletProvider>
  )
}
