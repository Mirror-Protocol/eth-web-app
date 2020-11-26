import { useRouteMatch } from "react-router-dom"
import useHash from "../libs/useHash"
import Page from "../components/Page"
import StakeDetailsHeader from "../components/StakeDetailsHeader"
import WithAddress from "../containers/WithAddress"
import { useSymbol } from "../database/useWhitelist"
import StakeForm from "../forms/StakeForm"

const Stake = () => {
  const { params } = useRouteMatch<{ token: string }>()
  const symbol = useSymbol(params.token)
  const { hash: type } = useHash("stake")
  const tab = { tabs: ["stake", "unstake"], current: type }

  return (
    <Page>
      <WithAddress>
        <StakeDetailsHeader center>{symbol}</StakeDetailsHeader>
        <StakeForm type={type} tab={tab} key={type} />
      </WithAddress>
    </Page>
  )
}

export default Stake
