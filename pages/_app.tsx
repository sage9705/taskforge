import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import Layout from '../components/layout/Layout';
import ErrorMessage from '../components/ui/ErrorMessage';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <ErrorMessage />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;