import ConnectButton from "../components/ConnectButton"
import useOnboard from "../ethereum/useOnboard"
import Connected from "./Connected"

const Connect = () => {
  const { disabled, ...attrs } = useOnboard()
  return disabled ? <Connected /> : <ConnectButton {...attrs} />
}

export default Connect
