import { FC } from "react"
import { useAddress } from "../database/address"
import ConnectionRequired from "../containers/ConnectionRequired"
import WithSuspense from "./WithSuspense"

const WithAddress: FC = ({ children }) => {
  const address = useAddress()

  return !address ? (
    <ConnectionRequired />
  ) : (
    <WithSuspense>{children}</WithSuspense>
  )
}

export default WithAddress
