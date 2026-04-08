import { useState } from 'react'
import { Text, View, Pressable, Alert, TextInput, ScrollView } from 'react-native'
import { useMobileWallet } from '@wallet-ui/react-native-kit'
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'

const connection = new Connection('https://api.devnet.solana.com')

export default function FaucetScreen() {
  const { account } = useMobileWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [customAddress, setCustomAddress] = useState('')

  const checkBalance = async () => {
    if (!account) {
      Alert.alert('Error', 'Please connect wallet first')
      return
    }

    setLoading(true)
    try {
      const pubKey = new PublicKey(account.address)
      const balanceInLamports = await connection.getBalance(pubKey)
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL
      setBalance(balanceInSOL)
      Alert.alert('Balance', `${balanceInSOL} SOL (Devnet)`)
    } catch (error) {
      Alert.alert('Error', 'Failed to get balance')
    } finally {
      setLoading(false)
    }
  }

  const requestAirdrop = async () => {
    if (!account) {
      Alert.alert('Error', 'Please connect wallet first')
      return
    }

    setLoading(true)
    try {
      const pubKey = new PublicKey(account.address)
      const signature = await connection.requestAirdrop(pubKey, 1 * LAMPORTS_PER_SOL)
      await connection.confirmTransaction(signature)
      Alert.alert('Success!', '1 SOL has been sent to your wallet (Devnet)')
      await checkBalance()
    } catch (error: any) {
      if (error.message?.includes('rate limit')) {
        Alert.alert('Rate Limited', 'You can only request once every 24 hours')
      } else {
        Alert.alert('Error', 'Failed to get airdrop')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black p-6">
      <Text className="text-3xl font-bold text-gray-800 dark:text-white mb-2">💰 Solana Devnet Tools</Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-8">Get free SOL for testing (no real money!)</Text>

      {account && (
        <View className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6">
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">Connected Wallet</Text>
          <Text className="text-gray-800 dark:text-white font-mono text-xs">{account.address.toString()}</Text>
          {balance !== null && (
            <Text className="text-green-600 dark:text-green-400 font-bold mt-2">Balance: {balance} SOL</Text>
          )}
        </View>
      )}

      <Pressable
        onPress={checkBalance}
        disabled={loading || !account}
        className={`py-4 rounded-xl mb-4 ${!account ? 'bg-gray-400' : 'bg-purple-600'}`}
      >
        <Text className="text-white font-bold text-center text-lg">{loading ? 'Loading...' : '💰 Check Balance'}</Text>
      </Pressable>

      <Pressable
        onPress={requestAirdrop}
        disabled={loading || !account}
        className={`py-4 rounded-xl mb-8 ${!account ? 'bg-gray-400' : 'bg-green-600'}`}
      >
        <Text className="text-white font-bold text-center text-lg">
          {loading ? 'Processing...' : '🎁 Get Free 1 SOL'}
        </Text>
      </Pressable>

      <Text className="text-xl font-bold text-gray-800 dark:text-white mb-4">🔍 Check Any Address</Text>

      <TextInput
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-4 text-gray-800 dark:text-white"
        placeholder="Enter Solana address"
        placeholderTextColor="#9CA3AF"
        value={customAddress}
        onChangeText={setCustomAddress}
      />

      <Pressable
        onPress={async () => {
          if (!customAddress) return
          setLoading(true)
          try {
            const pubKey = new PublicKey(customAddress)
            const balanceInLamports = await connection.getBalance(pubKey)
            const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL
            Alert.alert('Balance Check', `${balanceInSOL} SOL (Devnet)`)
          } catch (error) {
            Alert.alert('Error', 'Invalid Solana address')
          } finally {
            setLoading(false)
          }
        }}
        disabled={loading}
        className="bg-blue-600 py-4 rounded-xl"
      >
        <Text className="text-white font-bold text-center text-lg">🔎 Check Balance</Text>
      </Pressable>

      <View className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
        <Text className="text-yellow-800 dark:text-yellow-400 text-sm">
          ⚠️ Note: This is Devnet (test network). SOL here has no real value.
        </Text>
      </View>
    </ScrollView>
  )
}
