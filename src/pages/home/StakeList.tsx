import { useRecoilValue } from "recoil"
import { minus, number } from "../../libs/math"
import Grid from "../../components/Grid"
import { isAsset } from "../../types/isItem"
import { infoQuery } from "../../database/info"
import { useListed } from "../../database/assets"
import StakeItem from "./StakeItem"

const StakeList = () => {
  const listed = useListed()
  const info = useRecoilValue(infoQuery)

  return (
    <Grid wrap={3}>
      {listed
        .filter(isAsset)
        .sort(({ token: a }, { token: b }) =>
          number(minus(info[b].apr, info[a].apr))
        )
        .sort(
          ({ symbol: a }, { symbol: b }) =>
            getSymbolIndex(a) - getSymbolIndex(b)
        )
        .map(({ token }) => (
          <StakeItem {...info[token]} key={token} />
        ))}
    </Grid>
  )
}

export default StakeList

/* helpers */
const getSymbolIndex = (symbol: string) => (symbol === "MIR" ? 0 : 1)
