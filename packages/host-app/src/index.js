import React from 'react';
import ReactDOM from 'react-dom';
import { customConsoleLog } from '@moyummy/netlify-custom-lib';

Promise.resolve().then(async () => {
  customConsoleLog('Netlify!');
  const { default: App } = await import('./App');
  ReactDOM.render(<App />, document.getElementById('root'));
});
