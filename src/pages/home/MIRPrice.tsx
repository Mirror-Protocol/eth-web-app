import { useRecoilValue } from "recoil"
import { format } from "../../libs/parse"
import { infoQuery } from "../../database/info"
import { itemBySymbolQuery } from "../../database/asset"

const MIRPrice = () => {
  const info = useRecoilValue(infoQuery)
  const { token } = useRecoilValue(itemBySymbolQuery("MIR"))!
  const { price } = info[token]
  return <>{format(price)} UST</>
}

export default MIRPrice
