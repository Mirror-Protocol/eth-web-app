import { useRouteMatch } from "react-router-dom"
import useHash from "../libs/useHash"
import Page from "../components/Page"
import StakeDetailsHeader from "../components/StakeDetailsHeader"
import WithAddress from "../containers/WithAddress"
import { useAsset } from "../database/asset"
import StakeForm from "../forms/StakeForm"

const Stake = () => {
  const { params } = useRouteMatch<{ token: string }>()
  const item = useAsset(params.token)
  const { symbol } = item
  const { hash: type } = useHash("stake")
  const tab = { tabs: ["stake", "unstake"], current: type }

  return (
    <Page>
      <WithAddress>
        <StakeDetailsHeader center>{symbol}</StakeDetailsHeader>
        <StakeForm {...item} type={type} tab={tab} key={type} />
      </WithAddress>
    </Page>
  )
}

export default Stake
