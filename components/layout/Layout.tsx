import Head from 'next/head';
import { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import Link from 'next/link';

type LayoutProps = {
    children: ReactNode;
    title?: string;
};

const Layout = ({ children, title = 'TaskForge' }: LayoutProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="bg-white dark:bg-gray-800 shadow-md">
                <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <Link href="/" className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        TaskForge
                    </Link>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated && (
                            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                Dashboard
                            </Link>
                        )}
                        <Link href="/settings" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            Settings
                        </Link>
                        <ThemeSwitcher />
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-gray-100 dark:bg-gray-800 mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
                    <p>&copy; 2024 TaskForge. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;