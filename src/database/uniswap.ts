import { selectorFamily } from "recoil"
import getLinks from "../ethereum/uniswap"
import { itemBySymbolQuery } from "./asset"

export const uniswapLinksQuery = selectorFamily({
  key: "uniswapLinks",
  get: (token: string) => ({ get }) => {
    const { token: ust } = get(itemBySymbolQuery("UST"))!
    return getLinks({ input: ust, output: token })
  },
})
