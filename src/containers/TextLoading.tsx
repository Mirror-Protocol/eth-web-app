import classNames from "classnames/bind"
import styles from "./TextLoading.module.scss"

const cx = classNames.bind(styles)

const LENGTH = 3
const TEXT = "•"

const TextLoading = () => {
  return (
    <div className={styles.component}>
      {Array.from({ length: LENGTH }, (_, i) => (
        <span className={cx(styles.dot, `dot-${i}`)} key={i}>
          {TEXT}
        </span>
      ))}
    </div>
  )
}

export default TextLoading
