import { useState } from "react"
import { useRouteMatch } from "react-router-dom"
import { ethers } from "ethers"

import useForm from "../libs/useForm"
import { placeholder, step, validate as v } from "../libs/formHelpers"
import { renderBalance } from "../libs/formHelpers"
import FormGroup from "../components/FormGroup"

import useItem from "../database/useItem"
import useBalance from "../database/useBalance"
import useContract from "../database/useContract"
import FormContainer from "../forms/FormContainer"
import { fetchReceipt } from "./Result"

enum Key {
  value = "value",
}

const Stake = ({ type, tab }: { type: "stake" | "unstake"; tab: Tab }) => {
  /* context */
  const { params } = useRouteMatch<{ token: string }>()
  const { token } = params
  const { symbol, lp, pool } = useItem(token)
  const balance = useBalance({ stake: lp, unstake: pool }[type])

  /* form:validate */
  const validate = ({ value }: Values<Key>) => ({
    [Key.value]: v.amount(value, { symbol, max: balance }),
  })

  /* form:hook */
  const initial = { [Key.value]: "" }
  const form = useForm(initial, validate)
  const { values, getFields, attrs, invalid } = form
  const { value } = values
  const amount = ethers.utils.parseEther(value || "0")

  /* render:form */
  const fields = getFields({
    [Key.value]: {
      label: "Amount",
      input: {
        type: "number",
        step: step(symbol),
        placeholder: placeholder(symbol),
      },
      unit: "LP",
      help: renderBalance(balance, symbol),
    },
  })

  /* submit */
  const disabled = invalid

  const [label, setLabel] = useState<string>(type)
  const lpContract = useContract(lp)
  const poolContract = useContract(pool)

  const stake = async (signer: ethers.providers.JsonRpcSigner) => {
    const lpWithSigner = lpContract!.connect(signer)
    const approve = await lpWithSigner.approve(pool, amount)
    setLabel("Approving...")

    await fetchReceipt(approve.hash)
    setLabel("Approved!")

    const poolWithSigner = poolContract!.connect(signer)
    const { hash } = await poolWithSigner.stake(amount)
    return hash
  }

  const unstake = async (signer: ethers.providers.JsonRpcSigner) => {
    const poolWithSigner = poolContract!.connect(signer)
    const { hash } = await poolWithSigner.withdraw(amount)
    return hash
  }

  const tx = { stake, unstake }[type]
  const container = { attrs, tab, disabled, label, tx }

  return (
    <FormContainer {...container}>
      <FormGroup {...fields[Key.value]} />
    </FormContainer>
  )
}

export default Stake
