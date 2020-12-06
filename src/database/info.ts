import { selector } from "recoil"
import { Dictionary } from "ramda"
import { ethers } from "ethers"
import { div, plus, times } from "../libs/math"
import fetcher from "../ethereum/fetcher.json"
import { dictWithFn, integer } from "./dbUtils"
import * as calc from "./calc"
import { providerState } from "./atoms"
import { networkNameQuery } from "./network"
import { assetsQuery, listedAssetsQuery } from "./assets"
import { itemBySymbolQuery } from "./asset"

export const helperContractQuery = selector({
  key: "helperContract",
  get: ({ get }) => {
    const provider = get(providerState)
    const name = get(networkNameQuery)
    const helpers: Dictionary<string> = {
      homestead: "0xF497145AD68ed6aDFA981c21e5bCdE949d0C3935",
      ropsten: "0xc08e82786a62f27382ebE0a518533Fb4Fd91dC81",
    }

    const helper = helpers[name]
    const { abi } = fetcher.InfoFetcher
    const contract = new ethers.Contract(helper, abi, provider)

    return contract
  },
  dangerouslyAllowMutability: true,
})

type PairInfoData = [
  string, // pair lpToken
  ethers.BigNumber, // pair lpSupply
  string, // ust
  ethers.BigNumber, // ustReserve
  string, // asset
  string, // assetSymbol
  ethers.BigNumber // assetReserve
]

export const pairInfoQuery = selector({
  key: "pairInfo",
  get: async ({ get }) => {
    const contract = get(helperContractQuery)
    const contracts = get(listedAssetsQuery("all")).map(({ token }) => token)
    const pairInfo: PairInfoData[] = await contract.fetchPairInfo(contracts)

    const parse = (item: PairInfoData) => {
      const [, $lpSupply, , ustReserve, , , assetReserve] = item

      const lpSupply = integer($lpSupply.toString())
      const ust = integer(ustReserve.toString())
      const asset = integer(assetReserve.toString())
      const price = div(ust, asset)
      const total = plus(ust, times(asset, price))

      return { lpSupply, ust, asset, price, total }
    }

    return pairInfo.reduce<Dictionary<PairInfo>>(
      (acc, cur, index) => ({ ...acc, [contracts[index]]: parse(cur) }),
      {} as Dictionary<PairInfo>
    )
  },
})

type PoolInfoData = [
  string, // lpToken
  ethers.BigNumber, // lpStaked
  ethers.BigNumber // rewardRemains
]

export const poolInfoQuery = selector({
  key: "poolInfo",
  get: async ({ get }) => {
    const contract = get(helperContractQuery)
    const tokens = get(listedAssetsQuery("all")).map(({ token }) => token)
    const contracts = get(listedAssetsQuery("all")).map(({ pool }) => pool)
    const poolInfo: PoolInfoData[] = await contract.fetchPoolInfo(contracts)

    const parse = (item: PoolInfoData) => {
      const [, lpStaked, rewardRemains] = item

      return {
        lpStaked: integer(lpStaked.toString()),
        rewardRemains: integer(rewardRemains.toString()),
      }
    }

    return poolInfo.reduce<Dictionary<PoolInfo>>(
      (acc, cur, index) => ({ ...acc, [tokens[index]]: parse(cur) }),
      {} as Dictionary<PoolInfo>
    )
  },
})

export const infoQuery = selector({
  key: "info",
  get: ({ get }) => {
    const assets = get(assetsQuery)
    const pairInfo = get(pairInfoQuery)
    const poolInfo = get(poolInfoQuery)
    const { token: mir } = get(itemBySymbolQuery("MIR"))!

    const getInfo = (item: ListedAsset) => {
      const { token, symbol } = item
      const { price: MIRPrice } = pairInfo[mir]
      const tokenPair = pairInfo[token]
      const tokenPool = poolInfo[token]
      const { total: liquidityValue, lpSupply: totalLpShare } = tokenPair
      const { lpStaked: stakedLpShare } = tokenPool

      /* apr */
      const MIRAnnualRewards = String(
        calc.getMIRAnnualRewards(Date.now(), token === mir)
      )

      const params = {
        MIRAnnualRewards,
        MIRPrice,
        liquidityValue,
        stakedLpShare,
        totalLpShare,
      }

      const apr = calc.apr(params)
      const log = { symbol, ...params }
      return { ...item, ...tokenPair, ...tokenPool, apr, log }
    }

    return dictWithFn(assets, getInfo)
  },
})
