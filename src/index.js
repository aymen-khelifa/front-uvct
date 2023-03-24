import React from 'react';
import './index.css';
import App from './App';
import DataProvider from './redux/store';
import { createRoot } from 'react-dom/client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <DataProvider>
      <App />
    </DataProvider>
);
