import Page from "../components/Page"
import WithAddress from "../containers/WithAddress"
import SendForm from "../forms/SendForm"

const Send = () => (
  <Page>
    <WithAddress>
      <SendForm />
    </WithAddress>
  </Page>
)

export default Send
