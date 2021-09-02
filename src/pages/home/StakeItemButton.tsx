import { FC } from "react"
import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import { ReactComponent as Uniswap } from "../../images/Uniswap.svg"
import Icon from "../../components/Icon"
import useOpenToConnect from "./useOpenToConnect"
import styles from "./StakeItemButton.module.scss"

const cx = classNames.bind(styles)

interface Props {
  to?: string
  href?: string
  delisted?: boolean
  hidden?: boolean
}

const StakeItemButton: FC<Props> = (props) => {
  const { to, href, hidden, children, delisted } = props
  const handleClick = useOpenToConnect(href)

  const className = cx(styles.button, { hidden, delisted })
  const content = (
    <>
      {children}
      {to ? (
        <Icon name="chevron_right" size={18} />
      ) : (
        <Uniswap width={15} height={16} />
      )}
    </>
  )

  return delisted ? (
    <span className={className}>{content}</span>
  ) : to ? (
    <Link className={className} to={to}>
      {content}
    </Link>
  ) : !handleClick ? (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <button className={className} onClick={handleClick}>
      {content}
    </button>
  )
}

export default StakeItemButton
