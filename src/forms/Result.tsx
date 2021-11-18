import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { ethers } from "ethers"
import Wait, { STATUS } from "../components/Wait"
import Icon from "../components/Icon"
import MirrorLink from "../containers/MirrorLink"
import { providerState } from "../database/atoms"
import TxHash from "./TxHash"
import styles from "./Result.module.scss"

interface Props {
  hash: string
  error?: Error
  onFail: () => void
}

const Result = ({ hash, error, onFail }: Props) => {
  /* fetch receipt */
  const [receipt, setReceipt] = useState<ethers.providers.TransactionReceipt>()
  const [receiptError, setReceiptError] = useState<Error>()
  const provider = useRecoilValue(providerState)

  useEffect(() => {
    const wait = async () => {
      try {
        const receipt = await provider.waitForTransaction(hash)
        setReceipt(receipt)
      } catch (error) {
        setReceiptError(error as Error)
      }
    }

    wait()
  }, [hash, provider])

  /* status */
  const status = error
    ? STATUS.FAILURE
    : receipt
    ? STATUS.SUCCESS
    : STATUS.LOADING

  /* render */
  const renderHash = () => (
    <article>
      <h1>Transaction Submitted</h1>
      <p>
        View on Etherscan: <TxHash>{hash}</TxHash>
      </p>
    </article>
  )

  const wait = {
    status,
    hash: renderHash(),
    link:
      status === STATUS.SUCCESS
        ? { to: "/my", children: "My Page" }
        : undefined,
    button:
      status === STATUS.FAILURE
        ? { onClick: onFail, children: "Try Again" }
        : undefined,
  }

  return <Wait {...wait}>{error?.message ?? receiptError?.message}</Wait>
}

export default Result
