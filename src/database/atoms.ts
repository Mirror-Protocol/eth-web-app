import { ethers } from "ethers"
import { atom } from "recoil"

export const addressState = atom({
  key: "address",
  default: "",
})

export const providerState = atom({
  key: "provider",
  default: window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider("homestead"),
})

export const indexState = atom({
  key: "index",
  default: 0,
})
