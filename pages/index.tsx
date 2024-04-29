import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-primary mb-6">Welcome to Taskify</h1>
      <p className="text-xl mb-8">Organize your life, one task at a time.</p>
      <div className="space-x-4">
        <Link href="/login">
          <a className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300">
            Log In
          </a>
        </Link>
        <Link href="/register">
          <a className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded transition duration-300">
            Sign Up
          </a>
        </Link>
      </div>
    </div>
  );
}