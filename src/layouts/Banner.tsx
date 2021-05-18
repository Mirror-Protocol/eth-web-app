import { FC, useState } from "react"
import Icon from "../components/Icon"
import styles from "./Banner.module.scss"

interface Props {
  title: string
  dismiss?: boolean
}

const Banner: FC<Props> = ({ title, children, dismiss }) => {
  const [isOpen, setIsOpen] = useState(true)

  return !isOpen ? null : (
    <div className={styles.banner}>
      <section className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.content}>{children}</p>
      </section>

      {dismiss && (
        <button className={styles.close} onClick={() => setIsOpen(false)}>
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  )
}

export default Banner
