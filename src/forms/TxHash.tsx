import { useRecoilValue } from "recoil"
import TxLink from "../components/TxLink"
import { etherscanQuery } from "../database/selectors"

const TxHash = ({ children: hash }: { children: string }) => {
  const etherscan = useRecoilValue(etherscanQuery("tx"))
  return <TxLink hash={hash} link={etherscan(hash)} />
}

export default TxHash
