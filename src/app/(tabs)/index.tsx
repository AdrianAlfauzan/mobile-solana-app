import { StatusBar } from 'expo-status-bar'
import { Text, View, Pressable, Alert } from 'react-native'
import { useMobileWallet } from '@wallet-ui/react-native-kit'

export default function HomeScreen() {
  const { account, connect, disconnect } = useMobileWallet()

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      Alert.alert('No Wallet Found', 'Please install Phantom wallet first')
    }
  }

  return (
    <View className="flex-1 bg-white dark:bg-black items-center justify-center px-8">
      <Text className="text-4xl font-extrabold text-gray-800 dark:text-white mb-3">🚀 Solana Mobile</Text>

      <Text className="text-xl dark:text-white text-gray-700 mb-8 text-center">Build Solana dApps on mobile</Text>

      {account ? (
        <>
          <View className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl w-full mb-4">
            <Text className="text-gray-600 dark:text-gray-400 text-center">
              Connected: {account.address.toString().slice(0, 8)}...
            </Text>
          </View>
          <Pressable onPress={disconnect} className="bg-red-500 px-6 py-3 rounded-xl w-full">
            <Text className="text-white font-bold text-center">Disconnect Wallet</Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={handleConnect} className="bg-blue-600 px-6 py-3 rounded-xl w-full">
          <Text className="text-white font-bold text-center text-lg">Connect Wallet</Text>
        </Pressable>
      )}

      <StatusBar style="auto" />
    </View>
  )
}
