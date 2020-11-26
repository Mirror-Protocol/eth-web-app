import { gt } from "../libs/math"
import { useQueryAirdrop } from "../hooks"
import AirdropToast from "../airdrop/AirdropToast"

const Airdrop = () => {
  const airdrop = useQueryAirdrop()
  return !airdrop || !gt(airdrop.amount, 0) ? null : <AirdropToast />
}

export default Airdrop
