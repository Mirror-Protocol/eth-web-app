import ConnectButton from "../components/ConnectButton"
import { useAddress } from "../database/address"
import { useSelectWalletModal } from "../database/selectWalletModal"
import Connected from "./Connected"

const Connect = () => {
  const address = useAddress()
  const { open } = useSelectWalletModal()

  return address ? (
    <Connected />
  ) : (
    <ConnectButton onClick={open}>Connect</ConnectButton>
  )
}

export default Connect
