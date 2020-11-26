import Grid from "../../components/Grid"
import Page from "../../components/Page"
import WithAddress from "../../containers/WithAddress"
import Holdings from "./Holdings"
import Stake from "./Stake"

const My = () => (
  <Page>
    <WithAddress>
      <Grid>
        <Holdings />
      </Grid>

      <Grid>
        <Stake />
      </Grid>
    </WithAddress>
  </Page>
)

export default My
