import { StrictMode } from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { RecoilRoot } from "recoil"
// import * as Sentry from "@sentry/react"
// import { Integrations } from "@sentry/tracing"
import "./index.scss"
import App from "./App"

// process.env.NODE_ENV === "production" &&
//   Sentry.init({
//     dsn:
//       "https://50708db7737a4e0aa64b5f74890b2c47@o247107.ingest.sentry.io/5541003",
//     integrations: [new Integrations.BrowserTracing()],
//     tracesSampleRate: 1.0,
//     whitelistUrls: [
//       /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.){0,1}mirror\.finance/,
//       /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.){0,1}vercel\.app/,
//     ],
//   })

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
