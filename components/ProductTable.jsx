'use client';
import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-700 bg-gray-900 p-4">
      <table className="min-w-full divide-y divide-gray-700 text-gray-300">
        <thead>
          <tr className="bg-gradient-to-r from-purple-700 to-purple-900 text-white uppercase text-xs font-semibold tracking-wider">
            <th className="px-6 py-3 text-left">Nom</th>
            <th className="px-6 py-3 text-left">Quantité</th>
            <th className="px-6 py-3 text-left">Prix (€)</th>
            <th className="px-6 py-3 text-left">Catégorie</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-800 transition-colors duration-200"
            >
              <td className="px-6 py-4 font-medium">{product.nom}</td>
              <td className="px-6 py-4">{product.qte}</td>
              <td className="px-6 py-4">{product.prix}</td>
              <td className="px-6 py-4">{product.categorie}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4 space-x-2">
                <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm transition">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
