import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Rophim render error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-ink px-6 text-white">
          <section className="max-w-md rounded-lg border border-line bg-panel p-8 text-center">
            <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-brand" aria-hidden="true" />
            <h1 className="text-2xl font-semibold">Không thể hiển thị trang</h1>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Đã có lỗi xảy ra khi tải giao diện. Vui lòng làm mới trang hoặc thử lại sau.
            </p>
            <button
              className="mt-6 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              type="button"
              onClick={() => window.location.reload()}
            >
              Tải lại
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
