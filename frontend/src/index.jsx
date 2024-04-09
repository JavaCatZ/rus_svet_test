import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import configureStore from 'Store/configureStore';
import App from './App';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={configureStore}>
            <App />
        </Provider>
    </React.StrictMode>,
);
