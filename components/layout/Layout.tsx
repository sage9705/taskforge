import Head from 'next/head';
import { ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import Link from 'next/link';
import Hero from '../Hero';
import Benefits from '../Benefits';
import Features from '../Features';
import ScrollToTop from '../ScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../store/hooks';

type LayoutProps = {
    children: ReactNode;
    title?: string;
};

const Layout = ({ children, title = 'TaskForge' }: LayoutProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    const isHomePage = router.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={`fixed w-full z-10 transition-all duration-300 ${scrollY > 20 ? 'bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-3xl font-bold text-primary-600 dark:text-primary-400 transition-colors duration-300 hover:text-primary-700 dark:hover:text-primary-300">
                        TaskForge
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        {isAuthenticated && (
                            <Link href="/dashboard" className="text-text-light dark:text-text-dark hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
                                Dashboard
                            </Link>
                        )}
                        <Link href="/settings" className="text-text-light dark:text-text-dark hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
                            Settings
                        </Link>
                        <ThemeSwitcher />
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                Login
                            </Link>
                        )}
                    </div>
                    <button 
                        className="md:hidden text-text-light dark:text-text-dark hover:text-primary-600 dark:hover:text-primary-400"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden bg-background-light dark:bg-background-dark shadow-lg"
                        >
                            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                                {isAuthenticated && (
                                    <Link href="/dashboard" className="text-text-light dark:text-text-dark hover:text-primary-600 dark:hover:text-primary-400">
                                        Dashboard
                                    </Link>
                                )}
                                <Link href="/settings" className="text-text-light dark:text-text-dark hover:text-primary-600 dark:hover:text-primary-400">
                                    Settings
                                </Link>
                                {isAuthenticated ? (
                                    <button
                                        onClick={handleLogout}
                                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link href="/login" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                                        Login
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
            <main className="flex-grow pt-16">
                {isHomePage ? (
                    <>
                        <Hero />
                        <Benefits />
                        <Features />
                    </>
                ) : (
                    <div className="container mx-auto px-4 py-8">
                        {children}
                    </div>
                )}
            </main>
            <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-6 text-center text-text-light dark:text-text-dark">
                    <p>&copy; 2024 TaskForge. All rights reserved.</p>
                </div>
            </footer>
            <ScrollToTop />
        </div>
    );
};

export default Layout;