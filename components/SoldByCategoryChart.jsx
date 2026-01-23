'use client';

import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { describeSalesByCategory } from '@/lib/reducer/dataSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SoldByCategoryChart = () => {
  const dispatch = useDispatch();

  const {
    products,
    aiDescription,
    aiLoading,
  } = useSelector((state) => state.data);

  // 🔥 Build categoryMap safely (memoized)
  const categoryMap = useMemo(() => {
    const map = {};
    products
      .filter((p) => p.vendus > 0)
      .forEach((p) => {
        map[p.categorie] =
          (map[p.categorie] || 0) + Number(p.vendus);
      });
    return map;
  }, [products]);

  const labels = Object.keys(categoryMap);

  const data = {
    labels,
    datasets: [
      {
        label: 'Products Sold',
        data: Object.values(categoryMap),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Products Sold per Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  // 🤖 AUTO-GENERATE AI INSIGHT
  useEffect(() => {
    if (labels.length > 0) {
      dispatch(describeSalesByCategory(categoryMap));
    }
  }, [dispatch, labels.length]);

  return (
    <div className="mt-6">
      <Bar data={data} options={options} />

      {aiLoading && (
        <p className="mt-4 text-purple-400 animate-pulse">
          Analyzing sales data with AI...
        </p>
      )}

      {aiDescription && !aiLoading && (
        <div className="mt-4 p-4 bg-gray-800 rounded-xl text-gray-100 border border-purple-500">
          <h3 className="font-bold text-purple-300 mb-2">
            AI Insight
          </h3>
          <p>{aiDescription}</p>
        </div>
      )}
    </div>
  );
};

export default SoldByCategoryChart;
