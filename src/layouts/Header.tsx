import { ReactComponent as Logo } from "../images/mETH.svg"
import AppHeader from "../components/AppHeader"
import Connect from "./Connect"

const Header = () => (
  <AppHeader
    logo={<Logo height={40} />}
    menu={[
      { attrs: { to: "/", children: "Stake" } },
      { attrs: { to: "/my", children: "My Page" } },
    ]}
    connect={<Connect />}
    border
  />
)

export default Header
