import Page from "../../components/Page"
import WithSuspense from "../../containers/WithSuspense"
import HomeHeader from "./HomeHeader"
import StakeList from "./StakeList"
import WhereToBuy from "./WhereToBuy"

const Home = () => (
  <Page>
    <HomeHeader />
    <WhereToBuy />
    <WithSuspense content={<StakeList />} />
  </Page>
)

export default Home
