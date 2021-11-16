import { NavLink } from "react-router-dom"
import classNames from "classnames/bind"
import styles from "./Menu.module.scss"

const cx = classNames.bind(styles)

const Menu = ({ list }: { list: MenuItem[] }) => {
  return (
    <ul className={styles.menu}>
      {list.map(({ attrs, desktopOnly }) => {
        return (
          <li
            className={classNames(styles.item, { desktop: desktopOnly })}
            key={attrs.children}
          >
            <NavLink
              {...attrs}
              className={({ isActive }) =>
                cx(styles.link, { active: isActive })
              }
            />
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
