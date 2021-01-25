import { useRecoilValue } from "recoil"

import { gt } from "../../libs/math"
import { format, formatAsset } from "../../libs/parse"
import { percent } from "../../libs/num"
import StakeItemCard from "../../components/StakeItemCard"

import { uniswapLinksQuery } from "../../database/uniswap"
import { balanceQuery } from "../../database/balance"
import { apy } from "../../database/calc"
import AddToMetamask from "./AddToMetamask"
import StakeItemButton from "./StakeItemButton"

const StakeItem = (props: AssetInfo) => {
  const { token, symbol, lp, pool, price, apr, lpStaked } = props
  const stakable = useRecoilValue(balanceQuery(lp))
  const staked = useRecoilValue(balanceQuery(pool))
  const { swap, add } = useRecoilValue(uniswapLinksQuery(token))

  const item = {
    token,
    symbol,
    stakable: stakable ? gt(stakable, 0) : false,
    staked: staked ? gt(staked, 0) : false,
    apy: percent(apy(apr)),
    totalStaked: formatAsset(lpStaked, "LP", { integer: true }),
    price: `${format(price)} UST`,
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
