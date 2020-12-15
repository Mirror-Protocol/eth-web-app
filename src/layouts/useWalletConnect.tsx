import { useSetRecoilState } from "recoil"
import { ethers } from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { addressState, infuraId, providerState } from "../database/atoms"

const useWalletConnect = () => {
  const setProvider = useSetRecoilState(providerState)
  const setAddress = useSetRecoilState(addressState)

  const onClick = async () => {
    const provider = new WalletConnectProvider({ infuraId })
    const [address] = await provider.enable()
    setAddress(address)
    setProvider(new ethers.providers.Web3Provider(provider))
  }

  return { onClick }
}

export default useWalletConnect
