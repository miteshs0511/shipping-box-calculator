import React from 'react';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, Trash2 } from 'lucide-react';
import { hexToRgb } from '../utils/colorFormatter';
import { Box } from '../types/Box';

interface BoxListViewProps {
  boxes: Box[];
  totalBoxes: number;
  formattedTotalShippingCost: string;
  formatCurrency: (amount: number) => string;
  removeBox: (id: string) => void; // added
}

export const BoxListView: React.FC<BoxListViewProps> = ({
  boxes,
  totalBoxes,
  formattedTotalShippingCost,
  formatCurrency,
  removeBox, // added
}) => (
  <div className="min-h-screen bg-neutral pt-20 pb-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Package className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold text-textDark">Box List</h1>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Box</span>
          </Link>
        </div>

        {boxes.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-6">No boxes added yet</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Your First Box</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider rounded-tl-lg">
                    Receiver Name
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">
                    Weight (kg)
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">
                    Box Colour
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">
                    Destination Country
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">
                    Shipping Cost
                  </th>
                  <th className="px-6 py-4 text-center font-bold text-sm uppercase tracking-wider rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {boxes.map((box, index) => (
                  <tr
                    key={box.id}
                    className={`transition-colors duration-150 hover:bg-secondary hover:bg-opacity-5 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-textDark font-medium">{box.receiverName}</td>
                    <td className="px-6 py-4 text-textDark">{box.weight.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: box.boxColor }}
                        />
                        <span className="text-sm text-gray-600">{hexToRgb(box.boxColor)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-textDark">{box.destinationCountry}</td>
                    <td className="px-6 py-4 text-textDark font-bold">
                      {formatCurrency(box.shippingCost)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        aria-label={`Delete box ${box.receiverName}`}
                        onClick={() => {
                          if (confirm('Delete this box?')) removeBox(box.id);
                        }}
                        className="inline-flex items-center justify-center p-2 rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {boxes.length > 0 && (
          <div className="mt-8 p-6 bg-neutral rounded-lg border-2 border-primary border-opacity-20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-600">Total Boxes</p>
                <p className="text-2xl font-bold text-primary">{totalBoxes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Shipping Cost</p>
                <p className="text-2xl font-bold text-secondary">{formattedTotalShippingCost}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
