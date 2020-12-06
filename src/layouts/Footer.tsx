import { useRecoilValue } from "recoil"
import AppFooter from "../components/AppFooter"
import { networkNameQuery } from "../database/network"

const Footer = () => {
  const name = useRecoilValue(networkNameQuery)
  return <AppFooter network={name} project="meth-web-app" />
}

export default Footer
