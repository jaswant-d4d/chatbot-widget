import { Component, type ReactNode, } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: any;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 px-4">
                    <div className="bg-white dark:bg-neutral-800 shadow-xl rounded-xl p-8 max-w-md text-center">
                        <h2 className="text-2xl font-semibold text-red-600 mb-3">
                            Something went wrong
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                            {this.state.error?.message || "An unexpected error occurred."}
                        </p>

                        <button
                            onClick={this.handleRetry}
                            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
