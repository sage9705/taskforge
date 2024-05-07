import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import Layout from '../components/layout/Layout';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function TaskForge({ Component, pageProps }: AppProps) {
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <Provider store={store}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <Layout>
          <ErrorMessage />
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
}

export default TaskForge;