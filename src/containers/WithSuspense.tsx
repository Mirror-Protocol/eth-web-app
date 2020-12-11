import { FC, ReactNode, Suspense } from "react"
import Loading from "../components/Loading"
import ErrorBoundary from "./ErrorBoundary"

interface Props {
  noFallback?: boolean
  fallback?: ReactNode
  content?: ReactNode
}

const Null = () => null

const WithSuspense: FC<Props> = (props) => {
  const { noFallback, fallback, content, children } = props

  return (
    <ErrorBoundary>
      <Suspense fallback={noFallback ? <Null /> : fallback ?? <Loading />}>
        {content ?? children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default WithSuspense
