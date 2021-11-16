import { useParams } from "react-router"

const useTokenParam = () => {
  const { token } = useParams()
  if (!token) throw new Error("Token is not defined")
  return token
}

export default useTokenParam
