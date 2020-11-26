import { FC, FormEvent, HTMLAttributes, useState } from "react"
import { useRecoilValue } from "recoil"
import { ethers } from "ethers"

import Container from "../components/Container"
import Tab from "../components/Tab"
import Card from "../components/Card"
import Confirm from "../components/Confirm"
import Button from "../components/Button"
import FormFeedback from "../components/FormFeedback"

import { providerState } from "../database/atoms"
import Result from "./Result"

interface Props {
  attrs?: HTMLAttributes<HTMLFormElement>
  tab: Tab
  contents?: Content[]
  messages?: string[]
  label?: string
  disabled?: boolean
  tx: (contract: ethers.providers.JsonRpcSigner) => Promise<string>
}

const FormContainer: FC<Props> = ({ tx, ...props }) => {
  const { attrs, tab, contents, messages, label, children } = props

  /* context */
  const provider = useRecoilValue(providerState)

  /* submit */
  const [submitted, setSubmitted] = useState(false)
  const [hash, setHash] = useState<string>()
  const [error, setError] = useState<Error>()
  const disabled = props.disabled || submitted

  const submit = async () => {
    try {
      setSubmitted(true)
      const signer = provider!.getSigner()
      const hash = await tx(signer)
      setHash(hash)
    } catch (error) {
      setError(error)
    }
  }

  const reset = () => {
    setSubmitted(false)
    setHash(undefined)
    setError(undefined)
  }

  /* event */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    !disabled && submit()
  }

  /* render */
  const renderForm = () => {
    const button = { loading: submitted, disabled }
    return (
      <form {...attrs} onSubmit={handleSubmit}>
        {children}

        {contents && <Confirm list={contents} />}

        {messages?.map((message) => (
          <FormFeedback key={message}>{message}</FormFeedback>
        ))}

        <Button type="submit" {...button} size="lg" submit>
          {label ?? tab.current ?? "Submit"}
        </Button>
      </form>
    )
  }

  return (
    <Container sm>
      {!hash ? (
        <Tab {...tab}>{renderForm()}</Tab>
      ) : (
        <Card lg>
          <Result hash={hash} error={error} onFail={reset} />
        </Card>
      )}
    </Container>
  )
}

export default FormContainer
