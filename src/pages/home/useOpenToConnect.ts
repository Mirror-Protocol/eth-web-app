import { useEffect, useState } from "react"
import useOnboard from "../../ethereum/useOnboard"
import useAddress from "../../database/useAddress"

const useOpenToConnect = (href?: string) => {
  const { onClick } = useOnboard()
  const address = useAddress()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    clicked && href && window.open(href)
    setClicked(false)
  }, [clicked, href])

  const handleClick = () => {
    onClick()
    setClicked(true)
  }

  return !address ? handleClick : undefined
}

export default useOpenToConnect
