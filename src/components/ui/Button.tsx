
interface Props {
    type?: "submit" | "reset" | "button"
    label: string
    variant?: string
    className?: string
    disabled?: boolean;
    onClick?: () => void
}

const Button = ({ type = "button", label, variant = "primary", className, disabled = false, onClick }: Props) => {

    const baseStyles =
        "px-4 py-2 rounded-md text-sm font-medium transition-all shadow-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";

    const variantStyles =
        variant === "secondary"
            ? // SECONDARY BUTTON
            "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 border border-gray-900 dark:border-white hover:border-gray-300 dark:hover:border-gray-600 "
            : // PRIMARY BUTTON
            "bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 ";

    return (
        <>
            <button
                type={type}
                onClick={!disabled ? onClick : undefined}
                disabled={disabled}
                className={`${baseStyles} ${variantStyles} ${className}`}
            >
                {label} </button>
        </>
    )
}


export default Button
