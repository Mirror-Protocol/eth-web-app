import { useRecoilValue } from "recoil"
import { networkNameQuery } from "../database/network"
import { ReactComponent as Logo } from "../images/mETH.svg"
import AppHeader from "../components/AppHeader"
import Connect from "./Connect"

const Header = () => {
  const name = useRecoilValue(networkNameQuery)

  return (
    <AppHeader
      logo={<Logo height={40} />}
      menu={[
        { attrs: { to: "/", children: "Stake" } },
        { attrs: { to: "/my", children: "My Page" } },
      ]}
      connect={<Connect />}
      testnet={name !== "homestead"}
      border
    />
  )
}

export default Header
