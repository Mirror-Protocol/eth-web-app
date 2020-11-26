import { useRecoilValue } from "recoil"
import ConnectedButton from "../components/ConnectedButton"
import ConnectedInfo from "../components/ConnectedInfo"
import useAddress, { useTruncated } from "../database/useAddress"
import { etherscanQuery } from "../database/selectors"

const Connected = () => {
  const address = useAddress()
  const truncated = useTruncated()
  const etherscan = useRecoilValue(etherscanQuery("address"))

  const info = {
    address,
    truncated,
    link: { href: etherscan(address), children: "Etherscan" },
  }

  return (
    <ConnectedButton
      address={truncated}
      info={(close) => <ConnectedInfo {...info} close={close} />}
    />
  )
}

export default Connected
