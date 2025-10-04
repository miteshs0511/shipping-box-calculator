import React from 'react';
import { useBoxContext } from '../context/BoxContext';
import { BoxListView } from './BoxListView';

export const BoxListContainer: React.FC = () => {
  const { boxes, removeBox } = useBoxContext();

  // Format currency using Indian Rupees locale
  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  // Business logic: totals calculation
  const totalShippingCost = boxes.reduce((sum, box) => sum + box.shippingCost, 0);

  // Prepare data for view
  const viewData = {
    boxes,
    totalBoxes: boxes.length,
    formattedTotalShippingCost: formatCurrency(totalShippingCost),
    formatCurrency,
    removeBox, // added
  };

  return <BoxListView {...viewData} />;
};
