const UNISWAP = "https://app.uniswap.org"

const getLinks = ({ input, output }: { input: string; output: string }) => ({
  swap: `${UNISWAP}/#/swap?inputCurrency=${input}&outputCurrency=${output}`,
  add: `${UNISWAP}/#/add/${output}/${input}`,
  remove: `${UNISWAP}/#/remove/${output}/${input}`,
})

export default getLinks
