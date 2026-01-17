'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Add Product', path: '/addproduct' },
    { name: 'Product List', path: '/productlist' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <div className="bg-purple-600 w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold shadow-lg">
            S
          </div>
          <span className="text-2xl font-bold tracking-wide">Stockify</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => router.push(link.path)}
              className={`text-white font-medium hover:text-purple-400 transition-colors duration-300 ${
                router.pathname === link.path ? 'text-purple-400 underline underline-offset-4' : ''
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
