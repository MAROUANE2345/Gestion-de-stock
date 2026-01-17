'use client';

import React, { useEffect, useState } from 'react';
import { useParams,useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@/lib/reducer/dataSlice';
import ProductDelete from '@/components/ProductDelete';
import ProductEdit from '@/components/ProductEdit';
 
const Page = () => {
    const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.data);
  const [selectedId,setSelectedId] = useState(null);
  const [showDeleteModal,setShowDeleteModal] = useState(false);

  const [showEditModal,setShowEditModal] = useState(false);
    const EditPro = (product,id) => {
        setShowEditModal(true);
         
    }
  const deletePro = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  }
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-xl font-medium">Loading product...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-2xl p-8 max-w-md">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-300 text-center text-xl font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 px-4 py-3 rounded-lg font-medium text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!selectedProduct)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="text-center">
          <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 text-xl font-medium">Product not found</p>
          <p className="text-gray-500 mt-2">The product you're looking for doesn't exist</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-4 md:p-8">
      {/* Glassmorphism Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Product Details
          </h1>
          <p className="text-gray-400 mt-2 font-light">
            Complete Information • Stock Management • Detailed Analysis
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <span className="bg-gray-800 px-3 py-1 rounded-full">ID: {id}</span>
            <span className="text-gray-600">•</span>
            <span>Last updated: Today</span>
          </div>
        </div>
      </div>

      {/* Main Product Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Product Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-900/20 via-gray-800/30 to-cyan-900/20 p-6 md:p-8 border-b border-gray-700/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProduct.nom}</h2>
                <div className="flex items-center gap-3">
                  <span className="bg-purple-900/40 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-700/30">
                    {selectedProduct.categorie}
                  </span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedProduct.qte > 10 ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/30' : 'bg-amber-900/30 text-amber-300 border border-amber-700/30'}`}>
                    {selectedProduct.qte > 10 ? 'In Stock' : 'Low Stock'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">{selectedProduct.prix}€</div>
                <div className="text-gray-400 text-sm">Unit Price (VAT incl.)</div>
              </div>
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Stock Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-semibold">Current Stock</h3>
                  <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{selectedProduct.qte}</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full ${selectedProduct.qte > 50 ? 'bg-emerald-500' : selectedProduct.qte > 20 ? 'bg-cyan-500' : 'bg-amber-500'}`}
                    style={{ width: `${Math.min(selectedProduct.qte, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Price Details */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-semibold">Financial Information</h3>
                  <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Unit Price</span>
                    <span className="text-xl font-semibold text-white">{selectedProduct.prix} €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Value</span>
                    <span className="text-xl font-semibold text-emerald-400">{(selectedProduct.prix * selectedProduct.qte).toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-semibold">Status</h3>
                  <div className="w-10 h-10 rounded-lg bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${selectedProduct.qte > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-white">{selectedProduct.qte > 0 ? 'Available' : 'Out of Stock'}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {selectedProduct.qte > 20 ? 'Comfortable Stock' : 
                     selectedProduct.qte > 10 ? 'Medium Stock' : 
                     selectedProduct.qte > 0 ? 'Critical Stock' : 'Needs Restocking'}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Product Description</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg bg-gray-900/30 rounded-xl p-5">
                {selectedProduct.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700/50">
              <button onClick={()=>EditPro(selectedProduct,id)} className="group flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-purple-900/30 flex items-center justify-center gap-3">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Product
              </button>
              <button onClick={() => deletePro(selectedProduct.id)} className="group flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-red-700 transition-all duration-300 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-red-900/20 flex items-center justify-center gap-3">
                <svg className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Product
              </button>
              <button onClick={()=>router.push('/productlist')} className="group flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-gray-600 transition-all duration-300 px-8 py-4 rounded-xl font-semibold text-white shadow-lg flex items-center justify-center gap-3">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
              <ProductDelete id={selectedId} onClose={() => setShowDeleteModal(false)} />
            )}

    {showEditModal && (
              <ProductEdit product={selectedProduct} id={id} onClose={() => setShowEditModal(false)} />
            )}
    </div>
  );
};

export default Page;