import { selectorFamily, useRecoilValue } from "recoil"
import { integer } from "./dbUtils"
import { addressState } from "./atoms"
import { abiQuery } from "./abi"

export const balanceQuery = selectorFamily({
  key: "balance",
  get: (token: string) => async ({ get }) => {
    const address = get(addressState)
    const balance = get(abiQuery({ token, name: "balanceOf", param: address }))
    return integer(balance)
  },
})

export const useBalance = (token: string) => {
  const value = useRecoilValue(balanceQuery(token))
  return value
}
