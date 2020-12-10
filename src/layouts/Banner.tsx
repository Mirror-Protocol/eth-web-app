import { useState } from "react"
import Container from "../components/Container"
import ExtLink from "../components/ExtLink"
import Icon from "../components/Icon"
import { ReactComponent as Thunder } from "../images/Thunder.svg"
import styles from "./Banner.module.scss"

const Banner = () => {
  const [isOpen, setIsOpen] = useState(true)

  return !isOpen ? null : (
    <Container>
      <div className={styles.banner}>
        <Thunder className={styles.icon} width={24} height={30} />

        <section className={styles.main}>
          <h1 className={styles.title}>Need something faster?</h1>
          <p className={styles.content}>
            Use{" "}
            <ExtLink href="https://terra.mirror.finance">
              terra.mirror.finance
            </ExtLink>{" "}
            for 10x speed, lower transaction fee and higher APR!
          </p>
        </section>

        <button className={styles.close} onClick={() => setIsOpen(false)}>
          <Icon name="close" size={18} />
        </button>
      </div>
    </Container>
  )
}

export default Banner
