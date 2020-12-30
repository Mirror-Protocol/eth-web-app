import { FC, useState } from "react"
import { Dictionary } from "ramda"
import classNames from "classnames"
import Tooltip from "../../components/Tooltip"
import { DECIMALS } from "../../constants"

import MetaMask from "../../images/wallets/Metamask.png"
import AMZN from "../../images/icons/AMZN.png"
import AAPL from "../../images/icons/AAPL.png"
import BABA from "../../images/icons/BABA.png"
import GOOGL from "../../images/icons/GOOGL.png"
import IAU from "../../images/icons/IAU.png"
import MIR from "../../images/icons/MIR.png"
import MSFT from "../../images/icons/MSFT.png"
import NFLX from "../../images/icons/NFLX.png"
import QQQ from "../../images/icons/QQQ.png"
import SLV from "../../images/icons/SLV.png"
import TSLA from "../../images/icons/TSLA.png"
import TWTR from "../../images/icons/TWTR.png"
import USO from "../../images/icons/USO.png"
import UST from "../../images/icons/UST.png"
import VIXY from "../../images/icons/VIXY.png"

import styles from "./AddToMetamask.module.scss"

const icons: Dictionary<string> = {
  UST,
  MIR,
  mAAPL: AAPL,
  mAMZN: AMZN,
  mBABA: BABA,
  mGOOGL: GOOGL,
  mIAU: IAU,
  mMSFT: MSFT,
  mNFLX: NFLX,
  mQQQ: QQQ,
  mSLV: SLV,
  mTSLA: TSLA,
  mTWTR: TWTR,
  mUSO: USO,
  mVIXY: VIXY,
}

const AddToMetamask: FC<ListedItem> = ({ token, symbol, children }) => {
  const [, setAdded] = useState(false)

  const addToMetamask = async () => {
    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token,
            symbol,
            decimals: DECIMALS,
            image: icons[symbol],
          },
        },
      })

      setAdded(wasAdded)
    } catch (error) {
      // Do nothing
    }
  }

  const size = { width: 20, height: 20 }
  const tooltip = `Add ${symbol} to MetaMask`
  const icon = <img {...size} src={MetaMask} alt={tooltip} />

  return children ? (
    <button className={styles.button} onClick={addToMetamask}>
      <span className={styles.text}>{children}</span>
      {icon}
    </button>
  ) : (
    <Tooltip
      className={classNames(styles.button, styles.standalone)}
      onClick={addToMetamask}
      content={tooltip}
    >
      {icon}
    </Tooltip>
  )
}

export default AddToMetamask
