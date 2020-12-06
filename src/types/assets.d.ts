type ListedItem = ListedDenom | ListedAsset

interface ListedDenom {
  symbol: string
  name: string
  token: string
  status: string
}

interface ListedAsset {
  symbol: string
  name: string
  token: string
  lp: string
  pool: string
  status: string
}

type ListedType = "all" | "listed"

/* info */
interface AssetInfo extends ListedAsset, PairInfo, PoolInfo {
  apr: string
}

interface PairInfo {
  lpSupply: string
  ust: string
  asset: string
  price: string
  total: string
}

interface PoolInfo {
  lpStaked: string
  rewardRemains: string
}
