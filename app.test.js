/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import HomeStats from './app/page.js';

// ================= MOCKS =================
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/SoldByCategoryChart', () => () => (
  <div data-testid="mock-chart">Chart</div>
));

// ================= SAMPLE DATA =================
const products = [
  {
    id: 1,
    nom: 'Apple',
    qte: 10,
    prix: 2,
    categorie: 'Alimentation',
    vendus: 3,
  },
  {
    id: 2,
    nom: 'Shirt',
    qte: 5,
    prix: 20,
    categorie: 'Vetement',
    vendus: 1,
  },
];

// ================= MOCK SETUP =================
const mockDispatch = jest.fn();
const mockPush = jest.fn();

beforeEach(() => {
  useDispatch.mockReturnValue(mockDispatch);
  useRouter.mockReturnValue({ push: mockPush });

  useSelector.mockImplementation((selector) =>
    selector({
      data: {
        products,
        loading: false,
      },
    })
  );
});

// ================= TESTS =================
describe('HomeStats Page', () => {
  test('renders dashboard and summary cards', () => {
    render(<HomeStats />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    const totalProductsCard = screen.getByText('Total Products').parentElement;
    const soldProductsCard = screen.getByText('Products Sold').parentElement;

    expect(totalProductsCard).toHaveTextContent('2');
    expect(soldProductsCard).toHaveTextContent('4');
  });

  test('renders the chart section', () => {
    render(<HomeStats />);
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

  test('filters sold products by name', () => {
    render(<HomeStats />);

    fireEvent.change(
      screen.getByPlaceholderText('Type product name...'),
      { target: { value: 'shirt' } }
    );

    expect(screen.getByText('Shirt')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  test('filters sold products by category', () => {
    render(<HomeStats />);

    fireEvent.change(
      screen.getByLabelText('Category'),
      { target: { value: 'Alimentation' } }
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Shirt')).not.toBeInTheDocument();
  });
});
