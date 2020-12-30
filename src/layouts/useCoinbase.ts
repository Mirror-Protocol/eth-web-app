import { useSetRecoilState } from "recoil"
import { ethers } from "ethers"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
import { addressState, infuraId, providerState } from "../database/atoms"

const useWalletConnect = () => {
  const setProvider = useSetRecoilState(providerState)
  const setAddress = useSetRecoilState(addressState)

  const onClick = async () => {
    const connector = new WalletLinkConnector({
      url: `https://mainnet.infura.io/v3/${infuraId}`,
      appName: "mETH",
    })

    const { account, provider } = await connector.activate()

    account && setAddress(account)
    setProvider(new ethers.providers.Web3Provider(provider))
  }

  return { onClick }
}

export default useWalletConnect
