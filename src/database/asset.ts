import { selectorFamily, useRecoilValue } from "recoil"
import { listedQuery, whitelistQuery } from "./assets"

export const itemQuery = selectorFamily({
  key: "item",
  get: (token: string) => ({ get }) => {
    const whitelist = get(whitelistQuery)
    return whitelist[token] ?? {}
  },
})

export const assetQuery = selectorFamily({
  key: "asset",
  get: (token: string) => ({ get }) => {
    const item = get(itemQuery(token))
    return item as ListedAsset
  },
})

export const symbolQuery = selectorFamily({
  key: "symbol",
  get: (token: string) => ({ get }) => {
    const item = get(itemQuery(token))
    return item?.symbol ?? ""
  },
})

export const itemBySymbolQuery = selectorFamily({
  key: "itemBySymbol",
  get: (symbol: string) => ({ get }) => {
    const listed = get(listedQuery("listed"))
    return listed.find((item) => item.symbol === symbol)
  },
})

export const useItem = (token: string) => {
  const value = useRecoilValue(itemQuery(token))
  return value
}

export const useAsset = (token: string) => {
  const value = useRecoilValue(assetQuery(token))
  return value
}

export const useSymbol = (token: string) => {
  const value = useRecoilValue(symbolQuery(token))
  return value
}
