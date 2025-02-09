import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';

// Import the store from the correct location
 // Make sure this path matches the location of your store.js

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Pass the store as a prop to the Provider */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
