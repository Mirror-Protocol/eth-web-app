import { useRecoilValue } from "recoil"
import { ethers } from "ethers"

import { gt } from "../libs/math"
import { formatAsset } from "../libs/parse"
import useContract from "../database/useContract"
import { airdropTokenQuery } from "../database/selectors"
import { useQueryAirdrop } from "../hooks"
import FormContainer from "./FormContainer"

const Airdrop = () => {
  /* context */
  const airdrop = useQueryAirdrop()
  const airdropToken = useRecoilValue(airdropTokenQuery)
  const amount = airdrop?.amount ?? "0"

  /* confirm */
  const contents = [{ title: "Amount", content: formatAsset(amount, "MIR") }]

  /* submit */
  const contract = useContract(airdropToken)
  const tx = async (signer: ethers.providers.JsonRpcSigner) => {
    const withSigner = contract!.connect(signer)
    const { stage, address, proof } = airdrop!

    const { hash } = await withSigner.claim(
      String(stage),
      address,
      amount,
      JSON.parse(proof)
    )

    return hash
  }

  const tab = { tabs: ["Claim"], current: "Claim" }
  const disabled = !gt(amount, 0)
  const container = { tab, contents, disabled, tx }

  return <FormContainer {...container} />
}

export default Airdrop
