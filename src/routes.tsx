import { Route, Switch } from "react-router-dom"
import My from "./pages/my/My"
import Send from "./pages/Send"

export default (
  <Switch>
    <Route path="/" exact component={My} />
    <Route path="/send/:token" component={Send} />
  </Switch>
)
