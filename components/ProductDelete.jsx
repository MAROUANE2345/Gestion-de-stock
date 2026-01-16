'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/lib/reducer/dataSlice'; // make sure this thunk exists
import { toast } from 'sonner';

const ProductDelete = ({ id, onClose }) => {
    const dispatch = useDispatch();

    const deleteThis = async () => {
        try {
            await dispatch(deleteProduct(id)).unwrap(); // unwrap to catch errors
            toast.success('Produit supprimé avec succès');
            onClose(); // close popup after deletion
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-gray-800 text-white p-6 rounded-xl w-96 shadow-lg"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                <p className="mb-6 text-lg font-medium">Are you sure you want to delete this product?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={deleteThis}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDelete;
