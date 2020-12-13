import { ethers } from "ethers"
import { useEffect, useState } from "react"
import Wait, { STATUS } from "../components/Wait"
import Icon from "../components/Icon"
import MirrorLink from "../containers/MirrorLink"
import TxHash from "./TxHash"
import styles from "./Result.module.scss"

const CONFIRMATIONS = 1
export const fetchReceipt = async (hash: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const receipt = await provider.waitForTransaction(hash, CONFIRMATIONS)
  return receipt
}

interface Props {
  hash: string
  error?: Error
  onFail: () => void
}

const Result = ({ hash, error, onFail }: Props) => {
  /* fetch receipt */
  const [receipt, setReceipt] = useState<ethers.providers.TransactionReceipt>()
  const [receiptError, setReceiptError] = useState<Error>()

  useEffect(() => {
    const wait = async () => {
      try {
        const receipt = await fetchReceipt(hash)
        setReceipt(receipt)
      } catch (error) {
        setReceiptError(error)
      }
    }

    wait()
  }, [hash])

  /* status */
  const status =
    error || receiptError
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

  return (
    <Wait {...wait}>
      {error?.message ?? receiptError?.message}
      <p className={styles.banner}>
        <Icon name="info" size={12} />
        Transactions are faster at <MirrorLink />
      </p>
    </Wait>
  )
}

export default Result
