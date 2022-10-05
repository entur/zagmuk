import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppShellStandalone} from './AppShellStandalone';
import reportWebVitals from './reportWebVitals';

import './index.css';

if (process.env.REACT_APP_STANDALONE) {
  const root = ReactDOM.createRoot(document.getElementById('root') as Element);
  root.render(
    <AppShellStandalone
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE || ''}
      redirectUri={`${window.location.origin}${process.env.REACT_APP_AUTH0_RELATIVE_CALLBACK_URL}`}
    />,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();