import { ReactComponent as Logo } from "../images/mETH.svg"
import AppHeader from "../components/AppHeader"
import Connect from "./Connect"

const Header = () => (
  <AppHeader
    logo={<Logo height={40} />}
    menu={[
      { attrs: { to: "/", children: "Stake" }, desktopOnly: true },
      { attrs: { to: "/my", children: "My Page" }, desktopOnly: true },
    ]}
    connect={<Connect />}
    border
  />
)

export default Header
