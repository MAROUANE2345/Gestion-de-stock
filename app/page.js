'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/lib/reducer/dataSlice';
import SoldByCategoryChart from '@/components/SoldByCategoryChart';

const HomeStats = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-white text-xl">Loading...</p>;

  const totalProducts = products.length;
  const totalPrice = products.reduce((sum, product) => sum + Number(product.prix) * Number(product.qte), 0);
  const totalSold = products.reduce((sum, product) => sum + Number(product.vendus || 0), 0);
  const totalSoldPrice = products.reduce((sum, product) => sum + Number(product.vendus || 0) * Number(product.prix), 0);

  // Only products with vendus > 0
  const soldProducts = products.filter(product => product.vendus > 0);

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-400 mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-400 mb-2">Total Stock Value</h2>
          <p className="text-3xl font-bold">{totalPrice} €</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-400 mb-2">Products Sold</h2>
          <p className="text-3xl font-bold">{totalSold}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-400 mb-2">Total Sold Value</h2>
          <p className="text-3xl font-bold">{totalSoldPrice} €</p>
        </div>
      </div>


      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg">
  <SoldByCategoryChart />
</div>

      {/* Sold Products Table */}
      <div className="overflow-x-auto bg-gray-800 p-6 mt-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Sold Products</h2>
        {soldProducts.length === 0 ? (
          <p className="text-gray-400">No products sold yet.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="bg-gray-700/50 text-left text-sm font-semibold text-gray-200 uppercase">
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Sold Quantity</th>
                <th className="px-6 py-3">Total Price (€)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {soldProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-3">{product.nom}</td>
                  <td className="px-6 py-3">{product.categorie}</td>
                  <td className="px-6 py-3">{product.vendus}</td>
                  <td className="px-6 py-3">{(product.vendus * product.prix).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HomeStats;
