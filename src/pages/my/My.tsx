import Grid from "../../components/Grid"
import Page from "../../components/Page"
import WithAddress from "../../containers/WithAddress"
import Holdings from "./Holdings"

const My = () => (
  <Page>
    <WithAddress>
      <Grid>
        <Holdings />
      </Grid>
    </WithAddress>
  </Page>
)

export default My
