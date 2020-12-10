import Container from "./components/Container"
import { useReloadOnNetworkChange } from "./hooks"
import useRefreshOnPathnameChange from "./database/useRefresh"
import WithSuspense from "./containers/WithSuspense"
import Banner from "./layouts/Banner"
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import Airdrop from "./layouts/Airdrop"
import routes from "./routes"
import "./App.scss"

const App = () => {
  useReloadOnNetworkChange()
  useRefreshOnPathnameChange()

  return (
    <WithSuspense fallback={<Null />}>
      <Banner />
      <Header />
      <Container>{routes}</Container>
      <Footer />
      <Airdrop />
    </WithSuspense>
  )
}

export default App

/* fallback */
const Null = () => null
