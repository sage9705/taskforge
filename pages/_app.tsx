import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import Layout from '../components/layout/Layout';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {children}
    </div>
  );
}

function TaskForge({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Layout>
          <ErrorMessage />
          <Component {...pageProps} />
        </Layout>
      </ThemeWrapper>
    </Provider>
  );
}

export default TaskForge;