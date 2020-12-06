import { useRouteMatch } from "react-router-dom"
import bech32 from "bech32"
import { ethers } from "ethers"
import { AccAddress } from "@terra-money/terra.js"

import useForm from "../libs/useForm"
import { placeholder, step, validate as v } from "../libs/formHelpers"
import { renderBalance } from "../libs/formHelpers"
import FormGroup from "../components/FormGroup"

import { useSymbol } from "../database/asset"
import { useBalance } from "../database/balance"
import { useContract } from "../database/contract"
import FormContainer from "../forms/FormContainer"

enum Key {
  to = "to",
  value = "value",
}

const Send = () => {
  /* context */
  const { params } = useRouteMatch<{ token: string }>()
  const { token } = params
  const symbol = useSymbol(token)
  const balance = useBalance(token)

  /* form:validate */
  const validate = ({ to, value }: Values<Key>) => ({
    [Key.to]: v.address(to, [ethers.utils.isAddress, AccAddress.validate]),
    [Key.value]: v.amount(value, { symbol, max: balance }),
  })

  /* form:hook */
  const initial = { [Key.to]: "", [Key.value]: "" }
  const form = useForm(initial, validate)
  const { values, getFields, attrs, invalid } = form
  const { to, value } = values
  const decoded = decodeTerraAddress(to)
  const amount = ethers.utils.parseEther(value || "0")
  const isTerra = AccAddress.validate(to) && ethers.utils.isAddress(decoded)

  /* render:form */
  const fields = getFields({
    [Key.to]: {
      label: "Send to",
      input: {
        placeholder: "Ethereum address or Terra address",
        autoFocus: true,
      },
      unit: isTerra && "Terra",
    },

    [Key.value]: {
      label: "Amount",
      input: {
        type: "number",
        step: step(symbol),
        placeholder: placeholder(symbol),
      },
      unit: symbol,
      help: renderBalance(balance, symbol),
    },
  })

  /* submit */
  const disabled = invalid

  const contract = useContract(token)
  const tx = async (signer: ethers.providers.JsonRpcSigner) => {
    const withSigner = contract!.connect(signer)

    const tx = !isTerra
      ? withSigner.transfer(to, amount)
      : withSigner.burn(amount, decoded.padEnd(66, "0"))

    const { hash } = await tx
    return hash
  }

  const tab = { tabs: ["Send"], current: "Send" }
  const container = { tab, attrs, disabled, tx }

  return (
    <FormContainer {...container}>
      <FormGroup {...fields[Key.to]} />
      <FormGroup {...fields[Key.value]} />
    </FormContainer>
  )
}

export default Send

/* bech32 */
const decodeTerraAddress = (address: string) => {
  try {
    const { words } = bech32.decode(address)
    const data = bech32.fromWords(words)
    return "0x" + Buffer.from(data).toString("hex")
  } catch (error) {
    return ""
  }
}
