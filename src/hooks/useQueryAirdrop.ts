import { useMemo, useState } from "react"
import { useRecoilValue } from "recoil"
import { useQuery, ApolloClient, InMemoryCache } from "@apollo/client"
import AIRDROP from "../airdrop/gqldocs"
import { MAINNET } from "../constants"
import useAddress from "../database/useAddress"
import { networkNameQuery } from "../database/selectors"

const useQueryAirdrop = () => {
  const [airdrop, setAirdrop] = useState<Airdrop>()

  /* client */
  const name = useRecoilValue(networkNameQuery)
  const subdomain = name === MAINNET ? "" : "tequila-"
  const uri = `https://${subdomain}graph.mirror.finance/graphql`
  const client = useMemo(
    () => new ApolloClient({ uri, cache: new InMemoryCache() }),
    [uri]
  )

  /* address */
  const address = useAddress()

  /* query */
  useQuery<{ airdrop: Airdrop[] }>(AIRDROP, {
    variables: { address, network: "ETH" },
    client,
    onCompleted: (data) => setAirdrop(data?.airdrop[0]),
    skip: !address || !!airdrop,
  })

  return airdrop
}

export default useQueryAirdrop
