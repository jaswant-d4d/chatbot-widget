
interface Props {
    name: string
    src?: string
    className?: string
}
const Avatar = ({ name, src, className }: Props) => {
    return (
        <div>
            {src ? (
                <img
                    className={`inline-block size-9.5 rounded-full ${className}`}
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                    alt="Avatar" />
            ) : (
                <span className="inline-flex items-center justify-center size-11 rounded-full bg-gray-700 font-semibold text-white dark:bg-white dark:text-neutral-800">
                    {name?.charAt(0)}
                </span>
            )}

        </div>
    )
}

export default Avatar
