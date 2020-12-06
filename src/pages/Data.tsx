import Page from "../components/Page"
import Card from "../components/Card"
import WithSuspense from "../containers/WithSuspense"
import APR from "./info/APR"

const Data = () => (
  <Page>
    <Card title="APR">
      <WithSuspense>
        <APR />
      </WithSuspense>
    </Card>
  </Page>
)

export default Data
