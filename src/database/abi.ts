import { selectorFamily } from "recoil"
import { integer } from "./dbUtils"
import { indexState } from "./atoms"
import { contractQuery } from "./contract"

/* balance */
type Params = { token: string; name: string; param?: string }
export const abiQuery = selectorFamily({
  key: "abi",
  get: (params: Params) => async ({ get }) => {
    try {
      get(indexState)
      const { token, name, param } = params
      const contract = get(contractQuery(token))
      const fn = contract?.[name]
      // If param is undefined, error occurs
      const balance = await (param ? fn?.(param) : fn?.())
      return integer(balance?.toString() ?? "0")
    } catch {
      return "0"
    }
  },
})
