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

const Layout = ({ children, title = 'Todo List App' }: LayoutProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="bg-primary text-white shadow-md">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">TaskForge</h1>
                    <div className="flex items-center space-x-4">
                        <Link href="/settings" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Settings
                        </Link>
                        <ThemeSwitcher />
                        {isAuthenticated && (
                            <button
                                onClick={handleLogout}
                                className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-text-light dark:bg-text-dark text-white mt-auto">
                <div className="container mx-auto px-4 py-6 text-center">
                    <p>&copy; 2024 TaskForge. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;