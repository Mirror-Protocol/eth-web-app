import { useRecoilValue } from "recoil"
import { itemQuery } from "./selectors"

const useItem = (token: string) => {
  const value = useRecoilValue(itemQuery(token))
  return value
}

export default useItem
