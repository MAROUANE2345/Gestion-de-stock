'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { Toaster } from 'sonner'; // ✅ import Sonner
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <Navbar className="fixed inset-0 z-50" />
          <main className="pt-[50px]">{children}</main> 
          <Toaster position="top-right" /> {/* ✅ add Sonner here */}
        </Provider>
      </body>
    </html>
  );
}
