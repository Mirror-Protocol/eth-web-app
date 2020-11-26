import Page from "../components/Page"
import WithAddress from "../containers/WithAddress"
import AirdropForm from "../forms/AirdropForm"

const Aidrop = () => (
  <Page>
    <WithAddress>
      <AirdropForm />
    </WithAddress>
  </Page>
)

export default Aidrop
