import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, Spacing } from '@/Constants'
import EmptyState from '../EmptyState/EmptyState'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * App-level error boundary. Catches render-time crashes anywhere below it and
 * shows a recoverable fallback instead of an unmounted (white/black) screen.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // Surface the crash in dev tooling; a real app would report to Crashlytics.
    console.error('Uncaught error in component tree:', error)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <EmptyState
            title="Something went wrong"
            message="An unexpected error occurred. Please try again."
            actionLabel="Try Again"
            onAction={this.handleReset}
          />
        </View>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Spacing.xxl,
  },
})
