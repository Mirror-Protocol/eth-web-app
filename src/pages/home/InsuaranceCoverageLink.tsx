import { INSURANCE_COVERAGE } from "../../constants"
import ExtLink from "../../components/ExtLink"
import { ReactComponent as Icon } from "./Guard.svg"
import styles from "./InsuaranceCoverageLink.module.scss"

const InsuaranceCoverageLink = () => (
  <ExtLink href={INSURANCE_COVERAGE} className={styles.link}>
    <Icon width="20" height="20" />
    Get Insurance Coverage
  </ExtLink>
)

export default InsuaranceCoverageLink
