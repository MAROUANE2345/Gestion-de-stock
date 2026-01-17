'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SoldByCategoryChart = () => {
  const { products } = useSelector((state) => state.data);

  // Filter only products with vendus > 0
  const soldProducts = products.filter((p) => p.vendus > 0);

  // Group by category
  const categoryMap = {};
  soldProducts.forEach((p) => {
    if (categoryMap[p.categorie]) {
      categoryMap[p.categorie] += Number(p.vendus);
    } else {
      categoryMap[p.categorie] = Number(p.vendus);
    }
  });

  const labels = Object.keys(categoryMap); // categories
  const data = {
    labels,
    datasets: [
      {
        label: 'Products Sold',
        data: Object.values(categoryMap),
        backgroundColor: 'rgba(99, 102, 241, 0.7)', // purple-ish
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Products Sold per Category' },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SoldByCategoryChart;
