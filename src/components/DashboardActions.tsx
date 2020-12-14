import { HTMLAttributes } from "react"
import { Link, LinkProps } from "react-router-dom"
import Tippy, { TippyProps } from "@tippyjs/react"
import ExtLink from "./ExtLink"
import { DefaultTippyProps } from "./Tooltip"
import Icon from "./Icon"
import styles from "./DashboardActions.module.scss"

const DropdownTippyProps: TippyProps = {
  ...DefaultTippyProps,
  placement: "bottom-end",
  trigger: "click",
}

type Item = LinkProps | HTMLAttributes<HTMLAnchorElement>

const DashboardActions = ({ list }: { list: Item[] }) => {
  const renderList = () => (
    <ul className={styles.dropdown}>{list.map(renderItem)}</ul>
  )

  const renderItem = (item: Item, index: number) => (
    <li key={index}>
      {"to" in item ? (
        <Link {...item} className={styles.link} />
      ) : (
        <ExtLink {...item} className={styles.link} />
      )}
    </li>
  )

  return (
    <Tippy {...DropdownTippyProps} render={renderList}>
      <button className={styles.trigger}>
        <Icon name="more_horiz" size={18} />
      </button>
    </Tippy>
  )
}

export default DashboardActions
