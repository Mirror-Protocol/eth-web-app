import { selector, selectorFamily } from "recoil"
import getLinks from "../ethereum/uniswap"
import { itemBySymbolQuery } from "./asset"

export const getUniswapLinksQuery = selector({
  key: "getUniswapLinks",
  get: ({ get }) => {
    const { token: ust } = get(itemBySymbolQuery("UST"))!
    return (token: string) => getLinks({ input: ust, output: token })
  },
})

export const uniswapLinksQuery = selectorFamily({
  key: "uniswapLinks",
  get: (token: string) => ({ get }) => {
    const { token: ust } = get(itemBySymbolQuery("UST"))!
    return getLinks({ input: ust, output: token })
  },
})
