import { useRecoilValue } from "recoil"
import { percent } from "../../libs/num"
import { aprQuery } from "../../database/selectors"

const APR = ({ token }: { token: string }) => {
  const value = useRecoilValue(aprQuery(token))
  return <>{percent(value)}</>
}

export default APR
