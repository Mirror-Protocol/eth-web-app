import { selectorFamily, useRecoilValue, waitForNone } from "recoil"
import { dictWithFn } from "./dbUtils"
import { assetsQuery, whitelistQuery } from "./assets"
import { balanceQuery } from "./balance"

export const balancesQuery = selectorFamily({
  key: "balances",
  get: (key: keyof ListedItem) => ({ get }) => {
    const whitelist = get(whitelistQuery)
    const queries = dictWithFn(whitelist, (item) => balanceQuery(item[key]))
    const balances = get(waitForNone(queries))
    return balances
  },
})

export const assetsBalancesQuery = selectorFamily({
  key: "assetsBalances",
  get: (key: keyof ListedAsset) => ({ get }) => {
    const assets = get(assetsQuery)
    const queries = dictWithFn(assets, (item) => balanceQuery(item[key]))
    const balances = get(waitForNone(queries))
    return balances
  },
})

export const useBalances = (key: keyof ListedItem = "token") => {
  const value = useRecoilValue(balancesQuery(key))
  return value
}

export const useAssetsBalances = (key: keyof ListedAsset = "token") => {
  const value = useRecoilValue(assetsBalancesQuery(key))
  return value
}
