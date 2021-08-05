const UNISWAP =
  "https://bafybeieuvilr42qkvycmae3y6y5le4ddwwu5ohenbofavih64gpgip2tce.ipfs.dweb.link"

const getLinks = ({ input, output }: { input: string; output: string }) => ({
  swap: `${UNISWAP}/#/swap?inputCurrency=${input}&outputCurrency=${output}&use=V2`,
  add: `${UNISWAP}/#/add/v2/${output}/${input}`,
  remove: `${UNISWAP}/#/remove/v2/${output}/${input}`,
})

export default getLinks
