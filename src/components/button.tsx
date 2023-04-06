interface ButtonTypes {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Button = ({
    children,
    className,
    onClick
}: ButtonTypes) => {
    return (
        <button
            className={`${className} px-4 py-2 rounded-md outline-none transition-all duration-300`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;