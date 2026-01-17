'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/lib/reducer/dataSlice';
import ProductTable from '@/components/ProductTable';
import { useRouter } from 'next/navigation';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Gestion des Produits
        </h1>
        <p className="text-gray-400 mt-1">
          Tableau complet des produits disponibles
        </p>
      </header>

      {loading ? (
        <p className="text-white text-center mt-20 text-xl">Chargement...</p>
      ) : (
      
        <ProductTable products={products} />
        
      )}
    </div>
  );
};

export default ProductsPage;
