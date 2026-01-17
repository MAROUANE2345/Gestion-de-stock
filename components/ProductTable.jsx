"use client";
import React, { useState } from "react";
import ProductDelete from "./ProductDelete"; // make sure this exists
import ProductEdit from "./ProductEdit";
import { useRouter } from "next/navigation";
const ProductTable = ({ products }) => {
  const router = useRouter();
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // store clicked id
  const [product, setProduct] = useState({});
  const [editPopUp, setEditPopUp] = useState(false);

  const deleteProduct = (id) => {
    setSelectedId(id); // pass the clicked product id
    setDeletePopUp(true);
  };

  const editProduct = (product) => {
    setProduct(product);
    setEditPopUp(true);
  };

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
        <tbody
           
          className="divide-y divide-gray-700"
        >
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => router.push(`/detailproduct/${product.id}`)}
              className="hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            >
              <td className="px-6 py-4 font-medium">{product.nom}</td>
              <td className="px-6 py-4">{product.qte}</td>
              <td className="px-6 py-4">{product.prix}</td>
              <td className="px-6 py-4">{product.categorie}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4 space-x-2">
                <button
  onClick={() => router.push(`/detailproduct/${product.id}`)}
  className="px-3 py-1 cursor-pointer bg-white text-black rounded-md text-sm
             transition-colors duration-200
             hover:bg-black hover:text-white"
>
  Details
</button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    editProduct(product);
                  }}
                  className="px-3 py-1 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(product.id);
                  }}
                  className="px-3 py-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition"
                >
                  Delete
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Only change: pass selectedId and onClose */}
      {deletePopUp && (
        <ProductDelete id={selectedId} onClose={() => setDeletePopUp(false)} />
      )}

      {editPopUp && (
        <ProductEdit
          product={product}
          onClose={() => setEditPopUp(false)}
          id={product.id}
        />
      )}
    </div>
  );
};

export default ProductTable;
