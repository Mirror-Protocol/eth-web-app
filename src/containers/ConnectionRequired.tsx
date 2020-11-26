import Empty from "../components/Empty"
import useOnboard from "../ethereum/useOnboard"

const ConnectionRequired = () => {
  const attrs = useOnboard()

  return (
    <Empty>
      <button {...attrs} />
    </Empty>
  )
}

export default ConnectionRequired
