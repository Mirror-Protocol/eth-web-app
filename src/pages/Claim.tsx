import Page from "../components/Page"
import WithAddress from "../containers/WithAddress"
import ClaimForm from "../forms/ClaimForm"

const Claim = () => (
  <Page>
    <WithAddress>
      <ClaimForm />
    </WithAddress>
  </Page>
)

export default Claim
