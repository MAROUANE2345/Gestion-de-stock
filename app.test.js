/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import HomeStats from './app/page.js';
import ProductsPage from './app/productlist/page.js';
import ProductTable from './components/ProductTable';
import PageAddProduct from './app/addproduct/page.js';
import ProductDelete from './components/ProductDelete';
import ProductEdit from './components/ProductEdit';
import SoldByCategoryChart from './components/SoldByCategoryChart';

// ================= MOCKS =================
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// ================= SAMPLE DATA =================
const products = [
  { id: 1, nom: 'Apple', qte: 10, prix: 2, categorie: 'Alimentation', vendus: 3, description: 'Fresh apple' },
  { id: 2, nom: 'Shirt', qte: 5, prix: 20, categorie: 'Vetement', vendus: 1, description: 'Cotton shirt' },
  { id: 3, nom: 'Laptop', qte: 2, prix: 500, categorie: 'Electronique', vendus: 0, description: 'Gaming laptop' },
];

// ================= MOCKS SETUP =================
const mockDispatch = jest.fn();
const mockPush = jest.fn();

beforeEach(() => {
  useDispatch.mockReturnValue(mockDispatch);
  useRouter.mockReturnValue({ push: mockPush });
  useSelector.mockImplementation((selector) =>
    selector({ data: { products, loading: false, selectedProduct: products[0], aiDescription: '', aiLoading: false } })
  );
  jest.clearAllMocks();
});

// ================= TESTS =================
describe('HomeStats Component', () => {
  test('renders total cards correctly', () => {
    render(<HomeStats />);
    expect(screen.getByText('Total Products')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Products Sold')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument(); // 3 + 1 sold
  });

  test('filters sold products by category', () => {
    render(<HomeStats />);
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Alimentation' } });
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Shirt')).toBeNull();
  });

  test('filters sold products by name', () => {
    render(<HomeStats />);
    fireEvent.change(screen.getByPlaceholderText('Type product name...'), { target: { value: 'shirt' } });
    expect(screen.getByText('Shirt')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).toBeNull();
  });
});

describe('ProductsPage and ProductTable', () => {
  test('renders products table', () => {
    render(<ProductsPage />);
    expect(screen.getByText('Gestion des Produits')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Shirt')).toBeInTheDocument();
  });

  test('edit and delete buttons open modals', () => {
    render(<ProductTable products={products} />);
    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(screen.getByText('Modifier le produit')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(screen.getByText('Are you sure you want to delete this product?')).toBeInTheDocument();
  });
});

describe('AddProduct Page', () => {
  test('validation prevents adding invalid product', () => {
    render(<PageAddProduct />);
    fireEvent.click(screen.getByText('Ajouter le produit'));
    expect(require('sonner').toast.error).toHaveBeenCalled();
  });
});

describe('ProductDelete', () => {
  test('dispatch deleteProduct on confirm', async () => {
    render(<ProductDelete id={1} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Yes'));
    expect(mockDispatch).toHaveBeenCalled();
  });
});

describe('ProductEdit', () => {
  test('dispatch editProduct on save', () => {
    render(<ProductEdit product={products[0]} id={1} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Save'));
    expect(mockDispatch).toHaveBeenCalled();
  });
});

describe('SoldByCategoryChart', () => {
  test('renders chart with correct categories', () => {
    render(<SoldByCategoryChart />);
    expect(screen.getByText('Products Sold per Category')).toBeInTheDocument();
  });
});
