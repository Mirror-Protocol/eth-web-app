import Container from "./components/Container"
import { useReloadOnNetworkChange } from "./hooks"
import useRefreshOnPathnameChange from "./database/useRefresh"
import { useSelectWalletModal } from "./database/selectWalletModal"
import WithSuspense from "./containers/WithSuspense"
import Modal from "./containers/Modal"
import Header from "./layouts/Header"
import SelectWallet from "./layouts/SelectWallet"
import routes from "./routes"
import "./App.scss"

const App = () => {
  useReloadOnNetworkChange()
  useRefreshOnPathnameChange()
  const modal = useSelectWalletModal()

  return (
    <WithSuspense noFallback>
      <Header />
      <Container>{routes}</Container>
      <Modal {...modal}>
        <SelectWallet />
      </Modal>
    </WithSuspense>
  )
}

export default App
