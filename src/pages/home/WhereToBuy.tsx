import { useRecoilValue } from "recoil"
import { Dictionary } from "ramda"
import BuyLinks, { ICON_SIZE } from "../../components/BuyLinks"
import getLinks from "../../ethereum/uniswap"
import { networkNameQuery } from "../../database/network"
import { itemBySymbolQuery } from "../../database/asset"
import { ReactComponent as Uniswap } from "../../images/Uniswap.svg"
import useOpenToConnect from "./useOpenToConnect"
import AddToMetamask from "./AddToMetamask"
import styles from "./WhereToBuy.module.scss"

const USDT: Dictionary<string> = {
  homestead: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  ropsten: "0x6ee856ae55b6e1a249f04cd3b947141bc146273c",
}

const WhereToBuy = () => {
  const name = useRecoilValue(networkNameQuery)
  const ust = useRecoilValue(itemBySymbolQuery("UST"))!
  const { swap } = getLinks({ input: USDT[name], output: ust.token })
  const handleClick = useOpenToConnect(swap)

  const uniswap = {
    icon: <Uniswap className={styles.uniswap} {...ICON_SIZE} />,
    name: "Uniswap",
    attrs: !handleClick ? { href: swap } : { onClick: handleClick },
  }

  return (
    <BuyLinks
      type="eth"
      className={styles.component}
      action={<AddToMetamask {...ust}>Add UST to MetaMask</AddToMetamask>}
      links={[uniswap]}
    />
  )
}

export default WhereToBuy
