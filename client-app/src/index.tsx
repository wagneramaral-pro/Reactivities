import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './app/layout/styles.css';
import 'react-toastify/dist/ReactToastify.min.css'
import {RouterProvider} from 'react-router-dom'
import { router } from './app/router/Routes';
import 'react-datepicker/dist/react-datepicker.css'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();