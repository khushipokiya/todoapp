
import { Provider } from 'react-redux';
import { store } from '../store/store'; // Adjust the path to your store configuration
import '../styles/globals.css'; // Import global styles if any

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;



