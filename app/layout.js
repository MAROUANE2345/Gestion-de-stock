'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { Toaster } from 'sonner'; // ✅ import Sonner

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider store={store}>
          {children}
          <Toaster position="top-right" /> {/* ✅ add Sonner here */}
        </Provider>
      </body>
    </html>
  );
}
