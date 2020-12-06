import { selector } from "recoil"
import { Dictionary } from "ramda"
import { networkNameQuery } from "./network"

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
