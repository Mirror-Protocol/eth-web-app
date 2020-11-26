import { FC, ReactNode, Suspense } from "react"
import Loading from "../components/Loading"
import ErrorBoundary from "./ErrorBoundary"

const WithSuspense: FC<{ fallback?: ReactNode }> = ({ fallback, children }) => (
  <ErrorBoundary>
    <Suspense fallback={fallback ?? <Loading />}>{children}</Suspense>
  </ErrorBoundary>
)

export default WithSuspense
