import { gt } from "../../libs/math"
import { format } from "../../libs/parse"
import Card from "../../components/Card"
import Table from "../../components/Table"
import Delisted from "../../components/Delisted"
import DashboardActions from "../../components/DashboardActions"
import useWhitelist from "../../database/useWhitelist"
import useBalances from "../../database/useBalances"

const Holdings = () => {
  const whitelist = useWhitelist()
  const balances = useBalances()

  const loading = Object.values(balances).some(
    ({ state }) => state !== "hasValue"
  )

  const dataSource = Object.entries(balances)
    .filter(([, { contents: balance }]) => gt(balance, 0))
    .map(([token, { contents: balance }]) => {
      return { ...whitelist[token], token, balance }
    })

  const empty = !loading && !dataSource.length

  return (
    <Card title="Holdings" loading={loading}>
      {empty ? (
        <p>No data</p>
      ) : (
        <Table
          columns={[
            {
              key: "symbol",
              title: "Ticker",
              render: (symbol, { status }) => (
                <>
                  {status === "DELISTED" && <Delisted />}
                  {symbol}
                </>
              ),
              bold: true,
            },
            {
              key: "name",
              title: "Underlying Name",
            },
            {
              key: "balance",
              title: "Balance",
              render: (value, { symbol }) => format(value, symbol),
              align: "right",
            },
            {
              key: "actions",
              dataIndex: "token",
              render: (token) => {
                const send = { to: `/send/${token}`, children: "Send" }
                return <DashboardActions list={[send]} />
              },
              align: "right",
              fixed: "right",
            },
          ]}
          dataSource={dataSource}
        />
      )}
    </Card>
  )
}

export default Holdings
