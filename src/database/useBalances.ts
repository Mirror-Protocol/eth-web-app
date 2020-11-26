import { useRecoilValue } from "recoil"
import { balancesQuery } from "./selectors"

const useBalances = (key: keyof ListedItem = "token") => {
  const value = useRecoilValue(balancesQuery(key))
  return value
}

export default useBalances
