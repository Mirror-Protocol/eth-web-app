import { useRecoilValue } from "recoil"
import { Dictionary } from "ramda"
import ExtLink from "../../components/ExtLink"
import Icon from "../../components/Icon"
import { getIcon } from "../../components/TokenPair"
import getLinks from "../../ethereum/uniswap"
import { itemBySymbolQuery, networkNameQuery } from "../../database/selectors"
import useOpenToConnect from "./useOpenToConnect"
import AddToMetamask from "./AddToMetamask"
import styles from "./SwapLink.module.scss"

const USDT: Dictionary<string> = {
  homestead: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  ropsten: "0x6ee856ae55b6e1a249f04cd3b947141bc146273c",
}

const SIZE = { width: 30, height: 30 }

const SwapLink = () => {
  const name = useRecoilValue(networkNameQuery)
  const ust = useRecoilValue(itemBySymbolQuery("UST"))!
  const { swap } = getLinks({ input: USDT[name], output: ust.token })
  const handleClick = useOpenToConnect(swap)

  const content = (
    <>
      <header className={styles.flex}>
        <img src={getIcon("USDT")} alt="USDT" {...SIZE} />
        <Icon name="swap_horiz" />
        <img src={getIcon("UST")} alt="UST" {...SIZE} />
        <h1>Swap USDT for UST</h1>
      </header>
      <Icon name="chevron_right" size={24} />
    </>
  )

  const link = !handleClick ? (
    <ExtLink className={styles.button} href={swap}>
      {content}
    </ExtLink>
  ) : (
    <button className={styles.button} onClick={handleClick}>
      {content}
    </button>
  )

  return (
    <div className={styles.component}>
      {link}
      <AddToMetamask {...ust} />
    </div>
  )
}

export default SwapLink
