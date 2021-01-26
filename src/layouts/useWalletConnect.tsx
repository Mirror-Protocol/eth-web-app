import { useSetRecoilState } from "recoil"
import { ethers } from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { addressState, providerState } from "../database/atoms"

const rpc = { 56: "https://bsc-dataseed.binance.org/" }

const useWalletConnect = () => {
  const setProvider = useSetRecoilState(providerState)
  const setAddress = useSetRecoilState(addressState)

  const onClick = async () => {
    const provider = new WalletConnectProvider({ rpc })
    const [address] = await provider.enable()
    setAddress(address)
    setProvider(new ethers.providers.Web3Provider(provider))
  }

  return { onClick }
}

export default useWalletConnect
