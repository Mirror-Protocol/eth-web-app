import { useRecoilValue } from "recoil"
import { contractQuery } from "./selectors"

const useContract = (token: string) => {
  const value = useRecoilValue(contractQuery(token))
  return value
}

export default useContract
