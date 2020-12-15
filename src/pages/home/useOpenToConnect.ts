import { useEffect, useState } from "react"
import { useAddress } from "../../database/address"
import { useSelectWalletModal } from "../../database/selectWalletModal"

const useOpenToConnect = (href?: string) => {
  const { open } = useSelectWalletModal()
  const address = useAddress()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    clicked && href && window.open(href)
    setClicked(false)
  }, [clicked, href])

  const handleClick = () => {
    open()
    setClicked(true)
  }

  return !address ? handleClick : undefined
}

export default useOpenToConnect
