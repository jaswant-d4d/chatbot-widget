import Button from '@/components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'

const Error404 = () => {
    const navigate = useNavigate()
    return (
        <div className='dark:bg-gray-800 h-screen' >
            <div className="max-w-3xl flex flex-col mx-auto size-full ">
                <header className="mb-auto flex justify-center z-50 w-full mt-10">
                    <nav className="px-4 sm:px-6 lg:px-8">
                        <Link className="flex-none text-xl text-gray-800 font-semibold sm:text-3xl dark:text-white" to={"/"} aria-label="Chatbot">Chatbot</Link>
                    </nav>
                </header>

                <main id="content">
                    <div className="text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">404</h1>
                        <p className="mt-3 text-gray-600 dark:text-neutral-400">Oops, something went wrong.</p>
                        <p className="text-gray-600 dark:text-neutral-400">Sorry, we couldn't find your page.</p>
                        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                            <Button label='Back to home' onClick={() => navigate('/')} />
                        </div>
                    </div>
                </main>

                <footer className="mt-auto text-center py-5">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-500 dark:text-neutral-500">© All Rights Reserved. {new Date().getFullYear()}</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Error404
