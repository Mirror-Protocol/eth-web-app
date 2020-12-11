import { ethers } from "ethers"
import { atom } from "recoil"

export const addressState = atom({
  key: "address",
  default: "",
})

const projectId = "87ae9df0054a4467b5de8501e80bc07c"
export const providerState = atom({
  key: "provider",
  default: window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.InfuraProvider("homestead", projectId),
})

export const indexState = atom({
  key: "index",
  default: 0,
})
