import { useRecoilValue } from "recoil"
import { format } from "../../libs/parse"
import Doctor from "../../images/Doctor.png"
import { infoQuery } from "../../database/info"
import { itemBySymbolQuery } from "../../database/asset"
import styles from "./HomeHeader.module.scss"

const DOCTOR_SIZE = { width: 450, height: 348 }

const StakeHomeHeader = () => {
  const info = useRecoilValue(infoQuery)
  const { token } = useRecoilValue(itemBySymbolQuery("MIR"))!
  const { price } = info[token]

  return (
    <div className={styles.component}>
      <section className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.heading}>Select a material</h1>
          <section className={styles.encourage}>
            Earn MIR tokens by staking LP Tokens.
          </section>
        </header>

        <footer className={styles.summary}>
          <article className={styles.item}>
            <h1 className={styles.title}>MIR Price</h1>
            <section className={styles.content}>{format(price)} UST</section>
          </article>
        </footer>
      </section>

      <aside className={styles.image}>
        <img src={Doctor} {...DOCTOR_SIZE} alt="" />
      </aside>
    </div>
  )
}

export default StakeHomeHeader
