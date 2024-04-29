import Link from 'next/link';

export default function Home() {
    return (
        <div className="text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">Welcome to TaskForge</h1>
            <p className="text-xl mb-8">Organize your life, one task at a time.</p>
            <div className="space-x-4">
                <Link href="/login" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300">
                    Log In
                </Link>
                <Link href="/register" className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded transition duration-300">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}