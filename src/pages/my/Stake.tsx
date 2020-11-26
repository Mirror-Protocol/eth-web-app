import { useRecoilValue } from "recoil"
import { gt } from "../../libs/math"
import { formatAsset } from "../../libs/parse"
import getLpName from "../../libs/getLpName"
import Card from "../../components/Card"
import Table from "../../components/Table"
import Delisted from "../../components/Delisted"
import DashboardActions from "../../components/DashboardActions"
import { useListed } from "../../database/useWhitelist"
import useBalances from "../../database/useBalances"
import { rewardsQuery } from "../../database/selectors"

const Stake = () => {
  const listedAll = useListed(true)
  const stakableBalances = useBalances("lp")
  const stakedBalances = useBalances("pool")
  const rewards = useRecoilValue(rewardsQuery)
  const data = [stakableBalances, stakedBalances, rewards]

  const loading = data.some((balances) =>
    Object.values(balances).some(({ state }) => state !== "hasValue")
  )

  const dataSource = listedAll
    .filter(({ token }) =>
      data.some((balances) => gt(balances[token].contents, 0))
    )
    .map((item) => {
      const { token } = item
      return {
        ...item,
        stakable: stakableBalances[token].contents,
        staked: stakedBalances[token].contents,
        reward: rewards[token].contents,
      }
    })

  const empty = !loading && !dataSource.length

  return (
    <Card title="Stake" loading={loading}>
      {empty ? (
        <p>No data</p>
      ) : (
        <Table
          columns={[
            {
              key: "symbol",
              title: "Pool Name",
              render: (symbol, { status }) => (
                <>
                  {status === "DELISTED" && <Delisted />}
                  {getLpName(symbol)}
                </>
              ),
              bold: true,
            },
            {
              key: "staked",
              render: (value) => formatAsset(value, "LP"),
              align: "right",
            },
            {
              key: "stakable",
              render: (value) => formatAsset(value, "LP"),
              align: "right",
            },
            {
              key: "reward",
              render: (value) => formatAsset(value, "MIR"),
              align: "right",
            },
            {
              key: "actions",
              dataIndex: "token",
              render: (token) => {
                const path = `/stake/${token}`
                const list = [
                  { to: `${path}#stake`, children: "Stake" },
                  { to: `${path}#unstake`, children: "Unstake" },
                  { to: `/claim/${token}`, children: "Claim" },
                ]

                return <DashboardActions list={list} />
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

export default Stake
