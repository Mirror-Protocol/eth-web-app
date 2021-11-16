import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useHash = <T extends string>(initial?: T) => {
  const location = useLocation()
  const hash = decode(location.hash) as T
  const navigate = useNavigate()

  /* redirect */
  useEffect(() => {
    !hash && initial && navigate(encode(initial), { replace: true })
  }, [hash, navigate, initial])

  return { hash }
}

export default useHash

/* helpers */
const encode = (hash: string) => "#" + encodeURIComponent(hash)
const decode = (hash: string) =>
  decodeURIComponent(hash.replace("#", "")) || undefined
