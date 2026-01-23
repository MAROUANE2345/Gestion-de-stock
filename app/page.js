'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/lib/reducer/dataSlice';
import SoldByCategoryChart from '@/components/SoldByCategoryChart';
import { useRouter } from 'next/navigation';

const HomeStats = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, loading } = useSelector((state) => state.data);

  const [categorySearch, setCategorySearch] = useState('');
  const [searchTable, setSearchTable] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-white text-xl">Loading...</p>;

  const totalProducts = products.length;
  const totalPrice = products.reduce(
    (sum, product) => sum + Number(product.prix) * Number(product.qte),
    0
  );
  const totalSold = products.reduce(
    (sum, product) => sum + Number(product.vendus || 0),
    0
  );
  const totalSoldPrice = products.reduce(
    (sum, product) =>
      sum + Number(product.vendus || 0) * Number(product.prix),
    0
  );

  const soldProducts = products.filter((product) => product.vendus > 0);

  const filteredSoldProducts = soldProducts.filter((product) => {
    const matchesName = product.nom
      .toLowerCase()
      .includes(searchTable.toLowerCase());

    const matchesCategory =
      categorySearch === '' || product.categorie === categorySearch;

    return matchesName && matchesCategory;
  });

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Products', value: totalProducts },
          { label: 'Total Stock Value', value: `${totalPrice} €` },
          { label: 'Products Sold', value: totalSold },
          { label: 'Total Sold Value', value: `${totalSoldPrice} €` },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-gray-400 mb-2">{card.label}</h2>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg">
        <SoldByCategoryChart />
      </div>

      {/* Sold Products Table */}
      <div className="overflow-x-auto mt-10 bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-extrabold mb-6 text-purple-400 tracking-wide">
          Sold Products
        </h2>

        {/* 🔥 FILTER BAR */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Category Select */}
          <div className="w-full md:w-1/4">
            <label className="block mb-1 text-sm text-gray-400">
              Category
            </label>
            <select
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="">All Categories</option>
              <option value="Alimentation">Alimentation</option>
              <option value="Vetement">Vetement</option>
              <option value="Maison">Maison</option>
              <option value="Electronique">Electronique</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-1/3">
            <label className="block mb-1 text-sm text-gray-400">
              Search by name
            </label>
            <input
              type="text"
              placeholder="Type product name..."
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition shadow-sm"
            />
          </div>
        </div>

        {/* Table */}
        {filteredSoldProducts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No matching sold products.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-700 border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                {['Product Name', 'Category', 'Sold Quantity', 'Total Price (€)'].map(
                  (head) => (
                    <th
                      key={head}
                      className="px-6 py-3 text-left text-sm font-bold text-purple-300 uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSoldProducts.map((product, index) => (
                <tr
                  key={product.id}
                  onClick={() =>
                    router.push(`/detailproduct/${product.id}`)
                  }
                  className={`transition-colors ${
                    index % 2 === 0
                      ? 'bg-gray-900/50'
                      : 'bg-gray-900/30'
                  } hover:bg-purple-800/40 cursor-pointer`}
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {product.nom}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {product.categorie}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {product.vendus}
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-400">
                    {(product.vendus * product.prix).toFixed(2)} €
                  </td>
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
