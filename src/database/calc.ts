import BigNumber from "bignumber.js"
import { SMALLEST } from "../constants"

export const getMIRAnnualRewards = (now = Date.now(), isMIR = false) => {
  const GENESIS = 1607022000000
  const YEAR_TO_MILLISECONDS = 31536000000
  const rewards = [3431250, 1715625, 857813, 428906]
  const index = Math.max(0, Math.floor((now - GENESIS) / YEAR_TO_MILLISECONDS))
  const reward = rewards[index]
  return !reward ? undefined : isMIR ? reward * 3 : reward
}

interface Params {
  MIRAnnualRewards: string
  MIRPrice: string
  liquidityValue: string
  stakedLpShare: string
  totalLpShare: string
}

export const apr = (params: Params) => {
  const { MIRAnnualRewards, MIRPrice } = params
  const { liquidityValue, stakedLpShare, totalLpShare } = params

  const MIRAnnualRewardsValue = new BigNumber(MIRAnnualRewards).times(MIRPrice)
  const stakedRatio = new BigNumber(stakedLpShare).div(totalLpShare)
  const liquidityAmount = new BigNumber(liquidityValue).div(SMALLEST)

  const numerator = MIRAnnualRewardsValue
  const denominator = liquidityAmount.times(stakedRatio)

  return denominator.gt(0) ? numerator.div(denominator).toString() : "0"
}
