import { Redirect, Route, Switch } from "react-router-dom"
import My from "./pages/my/My"
import Send from "./pages/Send"

export default (
  <Switch>
    <Route path="/my" component={My} />
    <Route path="/send/:token" component={Send} />
    <Redirect to="/my" />
  </Switch>
)
