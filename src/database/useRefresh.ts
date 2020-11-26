import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { indexState } from "./atoms"

const useRefreshOnPathnameChange = () => {
  const { pathname } = useLocation()
  const setIndex = useSetRecoilState(indexState)

  useEffect(() => {
    setIndex((n) => n + 1)
  }, [setIndex, pathname])
}

export default useRefreshOnPathnameChange
