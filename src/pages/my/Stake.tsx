import { useRecoilValue } from "recoil"
import { gt } from "../../libs/math"
import { formatAsset } from "../../libs/parse"
import getLpName from "../../libs/getLpName"
import Card from "../../components/Card"
import Table from "../../components/Table"
import Delisted from "../../components/Delisted"
import DashboardActions from "../../components/DashboardActions"
import { useListedAssets } from "../../database/assets"
import { useAssetsBalances } from "../../database/balances"
import { rewardsQuery } from "../../database/rewards"
import { getUniswapLinksQuery } from "../../database/uniswap"

const Stake = () => {
  const listedAll = useListedAssets("all")
  const stakableBalances = useAssetsBalances("lp")
  const stakedBalances = useAssetsBalances("pool")
  const rewards = useRecoilValue(rewardsQuery)
  const getUniswapLinks = useRecoilValue(getUniswapLinksQuery)
  const data = [stakableBalances, stakedBalances, rewards]

  const loading = data.some((balances) =>
    Object.values(balances).some(({ state }) => state !== "hasValue")
  )

  const dataSource = listedAll
    .filter(({ token }) =>
      data.some((balances) => gt(balances[token].contents as string, 0))
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
                const { remove } = getUniswapLinks(token)
                const list = [
                  { to: `${path}#stake`, children: "Stake" },
                  { to: `${path}#unstake`, children: "Unstake" },
                  { to: `/claim/${token}`, children: "Claim" },
                  { href: remove, children: "Remove liquidity" },
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
