import { Route, Switch } from "react-router-dom"
import Home from "./pages/home/Home"
import My from "./pages/my/My"
import Send from "./pages/Send"
import Stake from "./pages/Stake"
import Claim from "./pages/Claim"
import Airdrop from "./pages/Airdrop"

export default (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/my" component={My} />
    <Route path="/send/:token" component={Send} />
    <Route path="/stake/:token" component={Stake} />
    <Route path="/claim/:token" component={Claim} />
    <Route path="/airdrop" component={Airdrop} />
  </Switch>
)
