import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';
import { verifyUser } from '../../utils/userStorage';
import { api } from '../../utils/api';
import { AppDispatch } from '../../store';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = await api.users.verify(email, password);
      if (user) {
        await dispatch(login(email, password));
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {router.query.registered && (
        <p className="text-green-500 mb-4">Registration successful. Please log in.</p>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-text font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-text font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;