import Page from "../../components/Page"
import WithSuspense from "../../containers/WithSuspense"
import HomeHeader from "./HomeHeader"
import StakeList from "./StakeList"
import WhereToBuy from "./WhereToBuy"
import GetInsuaranceCoverage from "./GetInsuaranceCoverage"

const Home = () => (
  <Page>
    <HomeHeader />
    <WhereToBuy />
    <GetInsuaranceCoverage />
    <WithSuspense content={<StakeList />} />
  </Page>
)

export default Home
