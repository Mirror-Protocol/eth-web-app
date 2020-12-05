import { useRecoilValue } from "recoil"

import { gt } from "../../libs/math"
import { formatAsset } from "../../libs/parse"
import StakeItemCard from "../../components/StakeItemCard"

import WithSuspense from "../../containers/WithSuspense"
import TextLoading from "../../containers/TextLoading"
import * as selector from "../../database/selectors"
import Price from "./Price"
import APR from "./APR"
import AddToMetamask from "./AddToMetamask"
import StakeItemButton from "./StakeItemButton"

const StakeItem = (props: Required<ListedItem>) => {
  const { token, symbol, lp, pool } = props
  const stakable = useRecoilValue(selector.balanceQuery(lp))
  const staked = useRecoilValue(selector.balanceQuery(pool))
  const total = useRecoilValue(selector.totalSupplyQuery(pool))
  const { swap, add } = useRecoilValue(selector.uniswapLinksQuery(token))

  const item = {
    token,
    symbol,
    stakable: stakable ? gt(stakable, 0) : false,
    staked: staked ? gt(staked, 0) : false,
    apr: (
      <WithSuspense fallback={<TextLoading />}>
        <APR token={token} />
      </WithSuspense>
    ),
    totalStaked: formatAsset(total, "LP", { integer: true }),
    price: (
      <WithSuspense fallback={<TextLoading />}>
        <Price token={token} />
      </WithSuspense>
    ),
    emphasize: symbol === "MIR",
  }

  return (
    <StakeItemCard {...item} action={<AddToMetamask {...props} />}>
      <StakeItemButton href={swap}>Buy token</StakeItemButton>
      <StakeItemButton href={add}>Provide liquidity</StakeItemButton>
      <StakeItemButton to={`/stake/${token}`}>Stake LP</StakeItemButton>
    </StakeItemCard>
  )
}

export default StakeItem
