'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProduct } from '@/lib/reducer/dataSlice';

const ProductEdit = ({ product, id, onClose }) => {
  const [productData, setProductData] = useState(product);
  const dispatch = useDispatch();

  const EditPro = () => {
    dispatch(editProduct({ id, updatedProduct: productData }));
    onClose(); // ✅ close popup after edit
  };

  return (
    // OVERLAY
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-md space-y-4"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2 className="text-xl font-semibold text-purple-400">
          Modifier le produit
        </h2>

        <input
          type="text"
          value={productData.nom}
          placeholder="Nom"
          onChange={(e) =>
            setProductData({ ...productData, nom: e.target.value })
          }
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="number"
          value={productData.qte}
          placeholder="Quantité"
          onChange={(e) =>
            setProductData({ ...productData, qte: e.target.value })
          }
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="number"
          value={productData.prix}
          placeholder="Prix"
          onChange={(e) =>
            setProductData({ ...productData, prix: e.target.value })
          }
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="text"
          value={productData.categorie}
          placeholder="Catégorie"
          onChange={(e) =>
            setProductData({ ...productData, categorie: e.target.value })
          }
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="text"
          value={productData.description}
          placeholder="Description"
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={EditPro}
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
