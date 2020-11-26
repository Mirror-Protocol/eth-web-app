import { Component, ReactNode, ErrorInfo } from "react"

interface Props {
  handleError?: (error: Error, errorInfo: ErrorInfo) => void
  fallback?: ReactNode
}

class ErrorBoundary extends Component<Props> {
  state = { hasError: false }
  static getDerivedStateFromError = () => ({ hasError: true })

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { handleError } = this.props
    handleError?.(error, errorInfo)
  }

  render() {
    const { fallback = null, children } = this.props
    const { hasError } = this.state
    return hasError ? fallback : children
  }
}

export default ErrorBoundary
