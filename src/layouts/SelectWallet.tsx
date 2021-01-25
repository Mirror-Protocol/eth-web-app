import Card from "../components/Card"
import Icon from "../components/Icon"
import BinanceChain from "../images/wallets/BinanceChain.png"
import MetaMask from "../images/wallets/Metamask.png"
import WalletConnect from "../images/wallets/WalletConnect.png"
import { useSelectWalletModal } from "../database/selectWalletModal"
import useBSC from "./useBSC"
import useOnboard from "../ethereum/useOnboard"
import useWalletConnect from "./useWalletConnect"
import styles from "./SelectWallet.module.scss"

const SelectWallet = () => {
  const { close } = useSelectWalletModal()
  const { onClick: onClickBSC } = useBSC()
  const { onClick: onClickMetaMask } = useOnboard()
  const { onClick: onClickWalletConnect } = useWalletConnect()

  const buttons = [
    {
      src: BinanceChain,
      label: "Binance Chain",
      onClick: onClickBSC,
    },
    {
      src: MetaMask,
      label: "MetaMask",
      onClick: onClickMetaMask,
    },
    {
      src: WalletConnect,
      label: "WalletConnect",
      onClick: onClickWalletConnect,
    },
  ]

  return (
    <Card className={styles.card}>
      <header className={styles.header}>
        <h1 className={styles.title}>Connect to a wallet</h1>
        <button className={styles.close} onClick={close}>
          <Icon name="close" size={24} />
        </button>
      </header>

      <ul>
        {buttons.map(({ src, label, onClick }) => (
          <li className={styles.item} key={label}>
            <button className={styles.button} onClick={onClick}>
              <span className={styles.label}>{label}</span>
              <img src={src} width={24} height={24} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default SelectWallet
