import AppHeader from "../components/AppHeader"
import Connect from "./Connect"

const Header = () => {
  return <AppHeader connect={<Connect />} border />
}

export default Header
