import { ethers } from "ethers"
import { atom } from "recoil"

export const addressState = atom({
  key: "address",
  default: "",
})

type Provider = ethers.providers.Web3Provider | ethers.providers.InfuraProvider
export const infuraId = "87ae9df0054a4467b5de8501e80bc07c"
export const providerState = atom<Provider>({
  key: "provider",
  default: new ethers.providers.InfuraProvider("homestead", infuraId),
  dangerouslyAllowMutability: true,
})

export const indexState = atom({
  key: "index",
  default: 0,
})
