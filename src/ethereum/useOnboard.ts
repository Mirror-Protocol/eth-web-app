import { useRef, useState, useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { ethers } from "ethers"
import MetaMaskOnboarding from "@metamask/onboarding"
import { addressState, providerState } from "../database/atoms"

enum ButtonText {
  ONBOARD = "Install MetaMask",
  CONNECT = "Connect",
  CONNECTED = "Connected",
}

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

const useOnboard = () => {
  const onboarding = useRef<MetaMaskOnboarding>()

  const [buttonText, setButtonText] = useState<ButtonText>(ButtonText.ONBOARD)
  const [disabled, setDisabled] = useState(false)
  const [account, setAccount] = useRecoilState(addressState)
  const setProvider = useSetRecoilState(providerState)

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account) {
        setButtonText(ButtonText.CONNECTED)
        setDisabled(true)
        onboarding.current?.stopOnboarding()
      } else {
        setButtonText(ButtonText.CONNECT)
        setDisabled(false)
      }
    }
  }, [account])

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const method = "eth_requestAccounts"
      const accounts = await window.ethereum?.request({ method })
      accounts && setAccount(accounts[0])
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    } else {
      onboarding.current?.startOnboarding()
    }
  }

  return { children: buttonText, disabled, onClick }
}

export default useOnboard
