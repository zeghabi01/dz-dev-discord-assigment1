import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthSystem from './utils/AuthSystem';
import DataProvider from './utils/DataProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthSystem>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthSystem>
  </React.StrictMode>
);

