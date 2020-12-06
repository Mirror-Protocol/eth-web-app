import { Dictionary } from "ramda"
import BigNumber from "bignumber.js"
import { DECIMALS, DECIMALS_TERRA } from "../constants"

/* utils */
export const dictWithFn = <T, Item>(
  obj: Dictionary<Item>,
  fn: (value: Item) => T
) =>
  Object.entries(obj).reduce<Dictionary<T>>(
    (acc, [key, value]) => ({ ...acc, [key]: fn(value) }),
    {}
  )

export const integer = (n: string) => {
  try {
    const r = BigNumber.ROUND_DOWN
    const d = new BigNumber(10).pow(DECIMALS - DECIMALS_TERRA).toString()
    const v = new BigNumber(n).div(d).integerValue(r).times(d).toString()
    return v
  } catch {
    return "0"
  }
}
