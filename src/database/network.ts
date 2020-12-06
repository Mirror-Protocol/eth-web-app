import { selector, selectorFamily } from "recoil"
import { MAINNET } from "../constants"
import { providerState } from "./atoms"

export const networkQuery = selector({
  key: "network",
  get: async ({ get }) => {
    try {
      const provider = get(providerState)
      const network = await provider?.getNetwork()
      return network
    } catch {
      return
    }
  },
})

export const networkNameQuery = selector({
  key: "networkName",
  get: ({ get }) => {
    const network = get(networkQuery)
    return network?.name ?? MAINNET
  },
})

export const etherscanQuery = selectorFamily({
  key: "etherscan",
  get: (path: "address" | "tx") => ({ get }) => {
    const name = get(networkNameQuery)
    const subdomain = name === MAINNET ? "" : `${name}.`
    return (hash: string) => `https://${subdomain}etherscan.io/${path}/${hash}`
  },
})
