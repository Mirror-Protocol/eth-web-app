import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import My from "./pages/my/My"
import Send from "./pages/Send"
import Stake from "./pages/Stake"
import Claim from "./pages/Claim"
import Airdrop from "./pages/Airdrop"
import Info from "./pages/Info"
import Data from "./pages/Data"

export default (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/my" element={<My />} />
    <Route path="/send/:token" element={<Send />} />
    <Route path="/stake/:token" element={<Stake />} />
    <Route path="/claim/:token" element={<Claim />} />
    <Route path="/airdrop" element={<Airdrop />} />
    <Route path="/info" element={<Info />} />
    <Route path="/data" element={<Data />} />
  </Routes>
)
