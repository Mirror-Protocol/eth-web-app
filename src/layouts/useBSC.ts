import { useSetRecoilState } from "recoil"
import { ethers } from "ethers"
import { BscConnector } from "@binance-chain/bsc-connector"
import { addressState, providerState } from "../database/atoms"

const useBSC = () => {
  const setProvider = useSetRecoilState(providerState)
  const setAddress = useSetRecoilState(addressState)

  const onClick = async () => {
    const connector = new BscConnector({ supportedChainIds: [56, 97] })

    const { account, provider } = await connector.activate()

    account && setAddress(account)
    setProvider(new ethers.providers.Web3Provider(provider))
  }

  return { onClick }
}

export default useBSC
