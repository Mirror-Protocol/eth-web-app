import { useRecoilValue } from "recoil"
import { div } from "../../libs/math"
import { format, formatAsset } from "../../libs/parse"
import { percent } from "../../libs/num"
import Table from "../../components/Table"
import { useListedAssets } from "../../database/assets"
import { infoQuery } from "../../database/info"

const Helpers = () => {
  const listed = useListedAssets("listed")
  const info = useRecoilValue(infoQuery)

  return (
    <Table
      columns={[
        { key: "symbol", title: "Ticker", bold: true },
        {
          key: "MIRAnnualRewards",
          title: "MIR annual rewards",
          render: (value) => format(value),
          align: "right",
        },
        {
          key: "MIRPrice",
          title: "MIR price",
          render: (value) => format(value),
          align: "right",
        },
        {
          key: "liquidityValue",
          title: "Liquidity value",
          render: (value) => formatAsset(value, "UST", { integer: true }),
          align: "right",
        },
        {
          key: "stakedLpShare",
          title: "Staked LP share",
          render: (value) => formatAsset(value, "LP", { integer: true }),
          align: "right",
        },
        {
          key: "totalLpShare",
          title: "Total LP share",
          render: (value) => formatAsset(value, "LP", { integer: true }),
          align: "right",
        },
        {
          key: "ratio",
          title: "Staking ratio",
          render: (_, { stakedLpShare, totalLpShare }) =>
            percent(div(stakedLpShare, totalLpShare)),
          align: "right",
        },
      ]}
      dataSource={listed.map(({ token }) => info[token].log)}
    />
  )
}

export default Helpers
