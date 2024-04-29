import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;