import { useRecoilValue } from "recoil"
import { useRouteMatch } from "react-router-dom"
import { ethers } from "ethers"

import { formatAsset } from "../libs/parse"
import { useAsset } from "../database/asset"
import { useContract } from "../database/contract"
import { rewardQuery } from "../database/rewards"
import FormContainer from "./FormContainer"

const Claim = () => {
  /* context */
  const { params } = useRouteMatch<{ token: string }>()
  const { token } = params
  const { pool } = useAsset(token)
  const reward = useRecoilValue(rewardQuery(token))

  /* confirm */
  const contents = [{ title: "Claiming", content: formatAsset(reward, "MIR") }]

  /* submit */
  const contract = useContract(pool)
  const tx = async (signer: ethers.providers.JsonRpcSigner) => {
    const withSigner = contract!.connect(signer)
    const { hash } = await withSigner.getReward()
    return hash
  }

  const tab = { tabs: ["Claim"], current: "Claim" }
  const container = { tab, contents, tx }

  return <FormContainer {...container} />
}

export default Claim
