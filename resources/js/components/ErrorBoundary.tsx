import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-900 p-4">
          <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-lg mb-2">An error occurred in this component:</p>
          <pre className="bg-red-200 p-2 rounded mb-4">
            {this.state.error && this.state.error.toString()}
          </pre>
          <p className="text-lg mb-2">Error details:</p>
          <pre className="bg-red-200 p-2 rounded">
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
