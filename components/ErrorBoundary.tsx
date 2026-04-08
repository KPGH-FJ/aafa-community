'use client';

import React from 'react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 错误边界组件
 * 捕获 React 组件树中的错误，防止整个应用崩溃
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
          <Container className="max-w-md text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
              页面出错了
            </h1>

            <p className="text-[#5C5852] mb-2">
              抱歉，页面加载时遇到了问题。
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="text-left bg-gray-100 rounded-lg p-4 mb-6 overflow-auto">
                <p className="text-sm font-mono text-red-600 mb-2">
                  {this.state.error.message}
                </p>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                  {this.state.error.stack}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={this.handleReset} variant="outline">
                重试
              </Button>
              <Button onClick={() => (window.location.href = '/')}>
                返回首页
              </Button>
            </div>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}
