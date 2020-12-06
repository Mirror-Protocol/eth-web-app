import { useRecoilValue } from "recoil"
import { format } from "../../libs/parse"
import Table from "../../components/Table"
import { useListedAssets } from "../../database/assets"
import { infoQuery } from "../../database/info"

const Pool = () => {
  const listed = useListedAssets("listed")
  const info = useRecoilValue(infoQuery)

  return (
    <Table
      columns={[
        { key: "symbol", title: "Ticker", bold: true },
        { key: "name", title: "Underlying Name" },
        {
          key: "ust",
          title: "UST",
          render: (value) => format(value, "UST", { integer: true }),
          align: "right",
        },
        {
          key: "asset",
          title: "Asset",
          render: (value, { symbol }) =>
            format(value, symbol, { integer: true }),
          align: "right",
        },
        {
          key: "price",
          title: "Price",
          render: (value) => `${format(value)} UST`,
          align: "right",
        },
        {
          key: "total",
          title: "Total",
          render: (value) => format(value, "UST", { integer: true }),
          align: "right",
        },
      ]}
      dataSource={listed.map(({ token }) => info[token])}
    />
  )
}

export default Pool
