import { StrictMode } from "react"
import { render } from "react-dom"
import { HashRouter as Router } from "react-router-dom"
import { RecoilRoot } from "recoil"
import "./index.scss"
import App from "./App"

render(
  <StrictMode>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById("meth")
)
