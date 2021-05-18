import { format } from "date-fns"
import delist from "../whitelist/delist.json"
import Button from "../components/Button"
import Card from "../components/Card"
import ExtLink from "../components/ExtLink"
import styles from "./DelistModalContent.module.scss"

const DelistModalContent = ({ close }: { close: () => void }) => {
  return (
    <Card title="Stock Split / Merge Notification" center>
      <div className={styles.contents}>
        <header className={styles.header}>
          The following asset will be <strong>delisted</strong> due to a stock
          split / merge.
        </header>

        <section className={styles.info}>
          {Object.values(delist).map(({ symbol, date }) => (
            <p key={symbol}>
              {symbol} ({format(new Date(date), "LLL dd, yyyy")})
            </p>
          ))}
        </section>

        <ul className={styles.list}>
          <li>
            <p>
              <strong>Delisted assets can be</strong> sent to a Terra address to
              be burnt on Mirror on{" "}
              <ExtLink href="https://terra.mirror.finance">
                Terra blockchain
              </ExtLink>{" "}
              to claim corresponding amount of UST. LP tokens can be used to
              withdraw liquidity.
            </p>
          </li>
          <li>
            <p>
              <strong>Delisted assets cannot be</strong> traded, or provided to
              liquidity pools. LP staking rewards will reduce significantly.
            </p>
          </li>
          <li>
            <p>
              You may trade, mint, provide liquidity for and stake LP tokens for
              the new asset on Mirror on Terra blockchain immediately after the
              stock split / merge, but not on Mirror on Ethereum.
            </p>
          </li>
        </ul>
        <ExtLink
          href="https://docs.mirror.finance/protocol/mirrored-assets-massets#delisting-and-migration"
          className={styles.link}
        >
          How does stock split/merge work on Mirror Protocol?
        </ExtLink>

        <Button onClick={close} size="lg" block>
          I understand
        </Button>
      </div>
    </Card>
  )
}

export default DelistModalContent
