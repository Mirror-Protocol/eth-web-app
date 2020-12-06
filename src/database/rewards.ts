import { selector, selectorFamily, waitForNone } from "recoil"
import { isAsset } from "../types/isItem"
import { dictWithFn } from "./dbUtils"
import { addressState } from "./atoms"
import { abiQuery } from "./abi"
import { whitelistQuery } from "./assets"
import { itemQuery } from "./asset"

export const rewardQuery = selectorFamily({
  key: "reward",
  get: (token: string) => ({ get }) => {
    const address = get(addressState)
    const item = get(itemQuery(token))

    if (isAsset(item)) {
      const { pool } = item
      const reward = get(
        abiQuery({ token: pool, name: "earned", param: address })
      )
      return reward
    }
  },
})

export const rewardsQuery = selector({
  key: "rewards",
  get: ({ get }) => {
    const whitelist = get(whitelistQuery)
    const queries = dictWithFn(whitelist, ({ token }) => rewardQuery(token))
    const rewards = get(waitForNone(queries))
    return rewards
  },
})
