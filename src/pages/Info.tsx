import { useRecoilValue } from "recoil"
import { div, plus, times } from "../libs/math"
import { format } from "../libs/parse"
import Page from "../components/Page"
import Card from "../components/Card"
import WithSuspense from "../containers/WithSuspense"
import { poolQuery } from "../database/selectors"
import { useListed } from "../database/useWhitelist"
import styles from "./Info.module.scss"

const Heading = () => (
  <article className={styles.item}>
    <h1 className={styles.title}>Symbol</h1>
    <section className={styles.content}>UST</section>
    <section className={styles.content}>Asset</section>
    <section className={styles.content}>Price</section>
    <section className={styles.content}>Total</section>
  </article>
)

const Item = ({ token, symbol }: ListedItem) => {
  const pool = useRecoilValue(poolQuery(token))

  const ust = pool?.ust
  const asset = pool?.asset
  const price = div(ust, asset)
  const total = plus(ust, times(asset, price))

  return (
    <article className={styles.item}>
      <h1 className={styles.title}>{symbol}</h1>
      <section className={styles.content}>
        {format(ust, undefined, { integer: true })}
      </section>
      <section className={styles.content}>
        {format(asset, undefined, { integer: true })}
      </section>
      <section className={styles.content}>{format(price)}</section>
      <section className={styles.content}>
        {format(total, undefined, { integer: true })}
      </section>
    </article>
  )
}

const Fallback = ({ symbol }: { symbol: string }) => (
  <article className={styles.item}>
    <h1 className={styles.title}>{symbol}</h1>
  </article>
)

const Info = () => {
  const listed = useListed()

  return (
    <Page>
      <Card title="Pool">
        <Heading />

        {listed.map((item) => {
          const { token, symbol, lp, pool } = item
          const isToken = lp && pool

          return (
            isToken && (
              <WithSuspense fallback={<Fallback symbol={symbol} />} key={token}>
                <Item {...item} />
              </WithSuspense>
            )
          )
        })}
      </Card>
    </Page>
  )
}

export default Info
