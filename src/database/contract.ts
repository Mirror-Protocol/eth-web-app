import { selectorFamily, useRecoilValue } from "recoil"
import { ethers } from "ethers"
import abi from "../ethereum/abi.json"
import { providerState } from "./atoms"

export const contractQuery = selectorFamily({
  key: "contract",
  get: (token: string) => ({ get }) => {
    try {
      const provider = get(providerState)
      // if token is empty, error occurs
      return token ? new ethers.Contract(token, abi, provider) : undefined
    } catch {
      return
    }
  },
  dangerouslyAllowMutability: true,
})

export const useContract = (token: string) => {
  const value = useRecoilValue(contractQuery(token))
  return value
}
