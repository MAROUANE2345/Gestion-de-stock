/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeStats from './app/page';

// ================= MOCKS =================
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('./components/SoldByCategoryChart', () => () => (
  <div data-testid="mock-chart">Chart</div>
));

// ================= SAMPLE DATA =================
const products = [
  {
    id: 1,
    nom: 'Apple',
    categorie: 'Alimentation',
    prix: 2,
    qte: 10,
    vendus: 3,
  },
  {
    id: 2,
    nom: 'Shirt',
    categorie: 'Vetement',
    prix: 20,
    qte: 5,
    vendus: 1,
  },
];

// ================= SETUP =================
const mockDispatch = jest.fn();

beforeEach(() => {
  useDispatch.mockReturnValue(mockDispatch);
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
    expect(screen.getByText('Total Products')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Products Sold')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument(); // 3 + 1
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
      screen.getByRole('combobox'),
      { target: { value: 'Alimentation' } }
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Shirt')).not.toBeInTheDocument();
  });
});
