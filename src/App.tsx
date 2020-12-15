import Container from "./components/Container"
import { useReloadOnNetworkChange } from "./hooks"
import useRefreshOnPathnameChange from "./database/useRefresh"
import { useSelectWalletModal } from "./database/selectWalletModal"
import WithSuspense from "./containers/WithSuspense"
import Modal from "./containers/Modal"
import Banner from "./layouts/Banner"
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import Airdrop from "./layouts/Airdrop"
import SelectWallet from "./layouts/SelectWallet"
import routes from "./routes"
import "./App.scss"

const App = () => {
  useReloadOnNetworkChange()
  useRefreshOnPathnameChange()
  const modal = useSelectWalletModal()

  return (
    <WithSuspense noFallback>
      <Banner />
      <Header />
      <Container>{routes}</Container>
      <Footer />
      <Airdrop />
      <Modal {...modal}>
        <SelectWallet />
      </Modal>
    </WithSuspense>
  )
}

export default App
