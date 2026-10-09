type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    loading?: boolean;
};

export function Button({
                           variant = 'primary',
                           loading = false,
                           disabled,
                           children,
                           ...props
                       }: ButtonProps) {
    return (
        <button
            className={`btn btn--${variant}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? 'Procesando...' : children}
        </button>
    );
}
