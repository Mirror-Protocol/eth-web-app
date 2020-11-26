import { useRecoilValue } from "recoil"
import { balanceQuery } from "./selectors"

const useBalance = (token: string) => {
  const value = useRecoilValue(balanceQuery(token))
  return value
}

export default useBalance
