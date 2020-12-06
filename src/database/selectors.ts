import { selector, selectorFamily, waitForNone } from "recoil"
import { Dictionary } from "ramda"
import { ethers } from "ethers"
import { Fetcher, Route, Token } from "@uniswap/sdk"
import BigNumber from "bignumber.js"
import { times } from "../libs/math"
import { DECIMALS, DECIMALS_TERRA, MAINNET } from "../constants"
import homestead from "../whitelist/homestead.json"
import ropsten from "../whitelist/ropsten.json"
import abi from "../ethereum/abi.json"
import getLinks from "../ethereum/uniswap"
import * as calc from "./calc"
import * as atom from "./atoms"

/* ethereum */
export const networkQuery = selector({
  key: "network",
  get: async ({ get }) => {
    try {
      const provider = get(atom.providerState)
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

export const airdropTokenQuery = selector<any>({
  key: "airdropToken",
  get: ({ get }) => {
    const tokens: Dictionary<string> = {
      homestead: "0x2A398bBa1236890fb6e9698A698A393Bb8ee8674",
      ropsten: "0x2A398bBa1236890fb6e9698A698A393Bb8ee8674",
    }

    const name = get(networkNameQuery)
    return tokens[name]
  },
})

/* whitelist */
export const whitelistQuery = selector<Dictionary<ListedItem>>({
  key: "whitelist",
  get: ({ get }) => {
    const name = get(networkNameQuery)
    const byNetwork: Dictionary<Dictionary<ListedItem>> = { homestead, ropsten }
    return byNetwork[name] ?? {}
  },
})

export const listedQuery = selectorFamily({
  key: "listed",
  get: (all: boolean) => ({ get }) => {
    const whitelist = get(whitelistQuery)
    const listedAll = Object.values(whitelist)
    return all
      ? listedAll
      : listedAll.filter(({ status }) => status === "LISTED")
  },
})

export const itemQuery = selectorFamily({
  key: "item",
  get: (token: string) => ({ get }) => {
    const whitelist = get(whitelistQuery)
    return whitelist[token] ?? {}
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
    const listed = get(listedQuery(false))
    return listed.find((item) => item.symbol === symbol)
  },
})

/* contract */
export const contractQuery = selectorFamily({
  key: "contract",
  get: (token: string) => ({ get }) => {
    try {
      const provider = get(atom.providerState)
      // if token is empty, error occurs
      return token ? new ethers.Contract(token, abi, provider) : undefined
    } catch {
      return
    }
  },
})

/* price */
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
    get(atom.indexState)
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

export const priceQuery = selectorFamily({
  key: "price",
  get: (token: string) => async ({ get }) => {
    const { route } = get(pairQuery(token))
    return route?.midPrice.toSignificant()
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

export const aprQuery = selectorFamily({
  key: "apr",
  get: (token: string) => ({ get }) => {
    const { token: mir } = get(itemBySymbolQuery("MIR"))!
    const MIRAnnualRewards = String(
      calc.getMIRAnnualRewards(Date.now(), token === mir)
    )

    const MIRPrice = get(priceQuery(mir))!
    const liquidityValue = times(2, get(liquidityValueQuery(token)))
    const { lp, pool } = get(itemQuery(token))

    if (lp && pool) {
      const totalLpShare = get(totalSupplyQuery(lp))
      const stakedLpShare = get(
        abiQuery({ token: lp, name: "balanceOf", param: pool })
      )

      if (process.env.NODE_ENV === "development") {
        const { symbol } = get(itemQuery(token))
        console.groupCollapsed(`APR: ${symbol}`)
        console.table({ token, lp, pool })
        console.table({
          "MIR annual rewards": MIRAnnualRewards,
          "MIR price": MIRPrice,
          "Liquidity value": liquidityValue,
          "Staked LP share": stakedLpShare,
          "Total LP share": totalLpShare,
        })
        console.groupEnd()
      }

      return calc.apr({
        MIRAnnualRewards,
        MIRPrice,
        liquidityValue,
        stakedLpShare,
        totalLpShare,
      })
    }
  },
})

/* balance */
type Params = { token: string; name: string; param?: string }
export const abiQuery = selectorFamily({
  key: "abi",
  get: (params: Params) => async ({ get }) => {
    try {
      get(atom.indexState)
      const { token, name, param } = params
      const contract = get(contractQuery(token))
      const fn = contract?.[name]
      // If param is undefined, error occurs
      const balance = await (param ? fn?.(param) : fn?.())
      return integer(balance?.toString() ?? "0") as any // TODO
    } catch {
      return "0"
    }
  },
})

export const balanceQuery = selectorFamily<
  string | undefined,
  string | undefined
>({
  key: "balance",
  get: (token?: string) => async ({ get }) => {
    const address = get(atom.addressState)

    if (token) {
      const balance = get(
        abiQuery({ token, name: "balanceOf", param: address })
      )

      return integer(balance)
    }
  },
})

export const balancesQuery = selectorFamily({
  key: "tokenBalances",
  get: (key: keyof ListedItem) => ({ get }) => {
    const whitelist = get(whitelistQuery)
    const queries = dictWithFn(whitelist, (item) => balanceQuery(item[key]))
    const balances = get(waitForNone(queries))
    return balances
  },
})

export const rewardQuery = selectorFamily({
  key: "reward",
  get: (token: string) => ({ get }) => {
    const address = get(atom.addressState)
    const { pool } = get(itemQuery(token))

    if (pool) {
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

/* uniswap */
export const uniswapLinksQuery = selectorFamily({
  key: "uniswapLinks",
  get: (token: string) => ({ get }) => {
    const { token: ust } = get(itemBySymbolQuery("UST"))!
    return getLinks({ input: ust, output: token })
  },
})

/* utils */
const dictWithFn = <T, Item>(obj: Dictionary<Item>, fn: (value: Item) => T) =>
  Object.entries(obj).reduce<Dictionary<T>>(
    (acc, [key, value]) => ({ ...acc, [key]: fn(value) }),
    {}
  )

const integer = (n: string) => {
  try {
    const r = BigNumber.ROUND_DOWN
    const d = new BigNumber(10).pow(DECIMALS - DECIMALS_TERRA).toString()
    const v = new BigNumber(n).div(d).integerValue(r).times(d).toString()
    return v
  } catch {
    return "0"
  }
}
