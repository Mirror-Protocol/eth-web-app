import { useRecoilValue } from "recoil"
import { listedQuery, symbolQuery, whitelistQuery } from "./selectors"

export const useSymbol = (token: string) => {
  const value = useRecoilValue(symbolQuery(token))
  return value
}

export const useListed = (all = false) => {
  const value = useRecoilValue(listedQuery(all))
  return value
}

const useWhitelist = () => {
  const value = useRecoilValue(whitelistQuery)
  return value
}

export default useWhitelist
