'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/lib/reducer/dataSlice';
import { toast } from 'sonner';

const Page = () => {
  const [product, setProduct] = useState({
    nom: '',
    qte: '',
    prix: '',
    categorie: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // ================= VALIDATION FUNCTION =================
  const validateProduct = () => {
    let valid = true;
    const newErrors = {};

    if (!product.nom.trim()) {
      newErrors.nom = 'Nom du produit requis';
      toast.error(newErrors.nom);
      valid = false;
    }

    if (!product.qte || Number(product.qte) <= 0) {
      newErrors.qte = 'Quantité doit être supérieure à 0';
      toast.error(newErrors.qte);
      valid = false;
    }

    if (!product.prix || Number(product.prix) <= 0) {
      newErrors.prix = 'Prix doit être supérieur à 0';
      toast.error(newErrors.prix);
      valid = false;
    }

    if (!product.categorie.trim()) {
      newErrors.categorie = 'Catégorie requise';
      toast.error(newErrors.categorie);
      valid = false;
    }

    if (!product.description.trim()) {
      newErrors.description = 'Description requise';
      toast.error(newErrors.description);
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ================= ADD PRODUCT FUNCTION =================
  const addTheProduct = () => {
    if (!validateProduct()) return;

    dispatch(
      addProduct({
        nom: product.nom,
        qte: product.qte,
        prix: product.prix,
        categorie: product.categorie,
        description: product.description
      })
    );

    toast.success('Produit ajouté avec succès');

    setProduct({
      nom: '',
      qte: '',
      prix: '',
      categorie: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-400 drop-shadow-lg mb-2">
            Ajouter un Produit
          </h1>
          <p className="text-gray-300">
            Gestion de Stock - Nouvel Article
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Nom du produit */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Nom du produit *</label>
              <input
                type="text"
                value={product.nom}
                onChange={(e) => setProduct({ ...product, nom: e.target.value })}
                placeholder="Entrez le nom du produit"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 outline-none"
              />
              {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
            </div>

            {/* Quantité */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Quantité en stock *</label>
              <input
                type="number"
                value={product.qte}
                onChange={(e) => setProduct({ ...product, qte: e.target.value })}
                placeholder="Quantité disponible"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 outline-none"
              />
              {errors.qte && <p className="text-red-500 text-sm">{errors.qte}</p>}
            </div>

            {/* Prix */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Prix unitaire *</label>
              <input
                type="number"
                value={product.prix}
                onChange={(e) => setProduct({ ...product, prix: e.target.value })}
                placeholder="Prix en €"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 outline-none"
              />
              {errors.prix && <p className="text-red-500 text-sm">{errors.prix}</p>}
            </div>

            {/* Catégorie */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Catégorie *</label>
              <select
                value={product.categorie}
                onChange={(e) => setProduct({ ...product, categorie: e.target.value })}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 outline-none"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="Électronique">Électronique</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Maison">Maison</option>
              </select>
              {errors.categorie && <p className="text-red-500 text-sm">{errors.categorie}</p>}
            </div>

            {/* Description - Full width */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-300">Description</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                placeholder="Description détaillée du produit..."
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 outline-none"
                rows={4}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-4">
              <button
                onClick={addTheProduct}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Ajouter le produit
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
