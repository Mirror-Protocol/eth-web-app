import { selector, selectorFamily, useRecoilValue } from "recoil"
import { Dictionary } from "ramda"
import homestead from "../whitelist/homestead.json"
import ropsten from "../whitelist/ropsten.json"
import { isAsset } from "../types/isItem"
import { networkNameQuery } from "./network"

export const whitelistQuery = selector<Dictionary<ListedItem>>({
  key: "whitelist",
  get: ({ get }) => {
    const name = get(networkNameQuery)
    const byNetwork: Dictionary<Dictionary<ListedItem>> = { homestead, ropsten }
    return byNetwork[name] ?? {}
  },
})

export const assetsQuery = selector<Dictionary<ListedAsset>>({
  key: "assets",
  get: ({ get }) => {
    const listed = get(listedAssetsQuery("all"))
    return listed.reduce<Dictionary<ListedAsset>>(
      (acc, item) =>
        Object.assign({}, acc, isAsset(item) && { [item.token]: item }),
      {} as Dictionary<ListedAsset>
    )
  },
})

export const listedQuery = selectorFamily({
  key: "listed",
  get: (type: ListedType) => ({ get }) => {
    const whitelist = get(whitelistQuery)
    const listedAll = Object.values(whitelist)
    return {
      all: listedAll,
      listed: listedAll.filter(({ status }) => status === "LISTED"),
    }[type]
  },
})

export const listedAssetsQuery = selectorFamily({
  key: "listedAssets",
  get: (type: ListedType) => ({ get }) => {
    const listed = get(listedQuery(type))
    return listed.filter(isAsset)
  },
})

export const useWhitelist = () => {
  const value = useRecoilValue(whitelistQuery)
  return value
}

export const useListed = (type: ListedType = "all") => {
  const value = useRecoilValue(listedQuery(type))
  return value
}

export const useListedAssets = (type: ListedType = "all") => {
  const value = useRecoilValue(listedAssetsQuery(type))
  return value
}
