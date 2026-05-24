/**
 * ErrorBoundary — catches unhandled JS render errors in production.
 * Shows a readable error screen instead of a blank crash.
 * Wrap around the root Stack in _layout.tsx.
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console so it appears in adb logcat / Metro
    console.error('[ErrorBoundary]', error.message);
    console.error(info.componentStack);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <View style={styles.root}>
          <Text style={styles.heading}>Something crashed</Text>
          <Text style={styles.name}>{this.state.error.name}</Text>
          <ScrollView style={styles.scroll}>
            <Text style={styles.message}>{this.state.error.message}</Text>
            {this.state.error.stack ? (
              <Text style={styles.stack}>{this.state.error.stack}</Text>
            ) : null}
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D0820',
    padding: 24,
    paddingTop: 60,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF4444',
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF8888',
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: '#F4EED8',
    lineHeight: 20,
    marginBottom: 16,
  },
  stack: {
    fontSize: 11,
    color: '#888',
    lineHeight: 16,
  },
});
