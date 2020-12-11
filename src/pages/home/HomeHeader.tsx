import WithSuspense from "../../containers/WithSuspense"
import TextLoading from "../../containers/TextLoading"
import Doctor from "../../images/Doctor.png"
import MIRPrice from "./MIRPrice"
import styles from "./HomeHeader.module.scss"

const DOCTOR_SIZE = { width: 450, height: 348 }

const StakeHomeHeader = () => {
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
            <section className={styles.content}>
              <WithSuspense fallback={<TextLoading />} content={<MIRPrice />} />
            </section>
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
