import { useRecoilValue } from "recoil"
import { format } from "../libs/parse"
import Page from "../components/Page"
import Card from "../components/Card"
import WithSuspense from "../containers/WithSuspense"
import TextLoading from "../containers/TextLoading"
import { poolQuery } from "../database/selectors"
import { useListed } from "../database/useWhitelist"
import styles from "./Data.module.scss"

const Item = ({ token, symbol }: ListedItem) => {
  const pool = useRecoilValue(poolQuery(token))

  return (
    <article className={styles.item}>
      <h1 className={styles.title}>{symbol}</h1>
      <section className={styles.content}>
        {format(pool?.ust, undefined, { integer: true })} (UST)
      </section>
      <section className={styles.content}>
        {format(pool?.asset, undefined, { integer: true })} (Asset)
      </section>
    </article>
  )
}

const Data = () => {
  const listed = useListed()

  return (
    <Page>
      <Card title="Pool">
        {listed.map((item) => (
          <WithSuspense fallback={<TextLoading />} key={item.token}>
            <Item {...item} />
          </WithSuspense>
        ))}
      </Card>
    </Page>
  )
}

export default Data
