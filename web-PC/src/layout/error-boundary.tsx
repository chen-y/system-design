
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";

export interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>> {

  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.info('Component error catch', error, info);
  }

  render(): ReactNode {

    const { fallback, children } = this.props;
    if (this.state.hasError) {
      return fallback;
    }

    return children;
  }

}

export default ErrorBoundary;
