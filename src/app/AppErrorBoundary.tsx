import React from 'react';

type Props = {
    children: React.ReactNode;
};

type State = {
    hasError: boolean;
};

export default class AppErrorBoundary extends React.Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(): State {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: unknown, info: React.ErrorInfo) {
        console.error('Error de renderizado:', error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="feature-page" role="alert">
                    <h1>La interfaz tuvo un problema.</h1>
                    <p>
                        Ocurrió un error inesperado al mostrar la aplicación.
                    </p>
                    <button
                        className="btn-primary"
                        onClick={() => window.location.reload()}
                    >
                        Recargar aplicación
                    </button>
                </main>
            );
        }

        return this.props.children;
    }
}