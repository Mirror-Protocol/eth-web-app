import Empty from "../components/Empty"
import { useSelectWalletModal } from "../database/selectWalletModal"

const ConnectionRequired = () => {
  const { open } = useSelectWalletModal()

  return (
    <Empty>
      <button onClick={open}>Connect</button>
    </Empty>
  )
}

export default ConnectionRequired
