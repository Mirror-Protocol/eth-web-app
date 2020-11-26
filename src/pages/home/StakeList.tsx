import Grid from "../../components/Grid"
import { useListed } from "../../database/useWhitelist"
import StakeItem from "./StakeItem"

const StakeList = () => {
  const listed = useListed()

  return (
    <Grid wrap={3}>
      {listed
        .filter(({ lp, pool }) => lp && pool)
        .sort(
          ({ symbol: a }, { symbol: b }) =>
            getSymbolIndex(a) - getSymbolIndex(b)
        )
        .map((item) => (
          <StakeItem {...item} key={item.token} />
        ))}
    </Grid>
  )
}

export default StakeList

/* helpers */
const getSymbolIndex = (symbol: string) => (symbol === "MIR" ? 0 : 1)
