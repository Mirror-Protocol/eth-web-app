import { useRecoilValue } from "recoil"
import { itemBySymbolQuery, priceQuery } from "../../database/selectors"
import { format } from "../../libs/parse"

const Price = ({ token, symbol }: { token?: string; symbol?: string }) => {
  const item = useRecoilValue(itemBySymbolQuery(symbol ?? ""))
  const price = useRecoilValue(priceQuery(token ?? item?.token ?? ""))
  return <>{format(price)} UST</>
}

export default Price
