import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from './contexts/product-data.context';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './contexts/user-data.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId='136305438350-e97jcgom5la20b1hobui9ou4vb93hncj.apps.googleusercontent.com'>
        <ProductProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </ProductProvider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
