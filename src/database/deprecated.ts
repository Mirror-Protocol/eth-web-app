import { selector, selectorFamily, waitForNone } from "recoil"
import { Fetcher, Route, Token } from "@uniswap/sdk"
import { DECIMALS } from "../constants"
import { dictWithFn } from "./dbUtils"
import { indexState } from "./atoms"
import { networkQuery } from "./network"
import { abiQuery } from "./abi"
import { whitelistQuery } from "./assets"
import { itemBySymbolQuery } from "./asset"

const tokenDataQuery = selectorFamily({
  key: "tokenData",
  get: (token: string) => async ({ get }) => {
    const network = get(networkQuery)

    if (network) {
      const tokenData = new Token(network.chainId, token, DECIMALS)
      return tokenData
    }
  },
})

const ustTokenDataQuery = selector({
  key: "ustTokenData",
  get: async ({ get }) => {
    const { token } = get(itemBySymbolQuery("UST"))!
    const tokenData = get(tokenDataQuery(token))
    return tokenData
  },
})

const pairQuery = selectorFamily({
  key: "pair",
  get: (token: string) => async ({ get }) => {
    get(indexState)
    const network = get(networkQuery)
    const token0 = get(ustTokenDataQuery)

    if (network && token0) {
      const token1 = new Token(network.chainId, token, DECIMALS)
      const pair = await Fetcher.fetchPairData(token0, token1)
      const route = new Route([pair], token1)
      return { pair, route }
    }

    return {}
  },
})

export const poolQuery = selectorFamily({
  key: "pool",
  get: (token: string) => async ({ get }) => {
    const ust = get(ustTokenDataQuery)
    const tokenData = get(tokenDataQuery(token))
    const { pair } = get(pairQuery(token))

    if (pair && ust && tokenData) {
      try {
        return {
          ust: pair.reserveOf(ust).toFixed(),
          asset: pair.reserveOf(tokenData).toFixed(),
        }
      } catch {
        // Do nothing
      }
    }
  },
})

export const liquidityValueQuery = selectorFamily({
  key: "liquidityValue",
  get: (token: string) => async ({ get }) => {
    const ust = get(ustTokenDataQuery)
    const { pair } = get(pairQuery(token))

    if (pair && ust) {
      return pair.reserveOf(ust).toFixed()
    }
  },
})

export const totalSupplyQuery = selectorFamily({
  key: "totalSupply",
  get: (token: string) => ({ get }) => {
    const value = get(abiQuery({ token, name: "totalSupply" }))
    return value
  },
})

export const totalSupplyListQuery = selector({
  key: "totalSupplyList",
  get: ({ get }) => {
    const whitelist = get(whitelistQuery)
    const queries = dictWithFn(whitelist, ({ token }) =>
      totalSupplyQuery(token)
    )
    const balances = get(waitForNone(queries))
    return balances
  },
})
