import { useEffect } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { addressState } from "./atoms"

export const selectWalletModalState = atom({
  key: "selectWalletModal",
  default: false,
})

export const useSelectWalletModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(selectWalletModalState)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  /* close modal on address change */
  const address = useRecoilValue(addressState)

  useEffect(() => {
    address && setIsOpen(false)
  }, [address, setIsOpen])

  return { isOpen, open, close }
}
