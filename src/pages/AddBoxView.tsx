import React from 'react';
import { Package } from 'lucide-react';
import { Country } from '../types/Box';
import { hexToRgb } from '../utils/colorFormatter';

interface AddBoxViewProps {
  formData: {
    receiverName: string;
    weight: string;
    boxColor: string;
    destinationCountry: Country | '';
  };
  errors: {
    receiverName: string;
    weight: string;
    destinationCountry: string;
  };
  touched: {
    receiverName: boolean;
    weight: boolean;
    destinationCountry: boolean;
  };
  countries: { label: string; value: Country }[];
  isFormValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddBoxView: React.FC<AddBoxViewProps> = ({
  formData,
  errors,
  touched,
  countries,
  isFormValid,
  onChange,
  onBlur,
  onSubmit,
}) => (
  <div className="min-h-screen bg-neutral pt-20 pb-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex items-center space-x-3 mb-8">
          <Package className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold text-textDark">Add New Box</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Receiver Name */}
          <div>
            <label htmlFor="receiverName" className="block text-sm font-semibold text-textDark mb-2">
              Receiver Name
            </label>
            <input
              type="text"
              id="receiverName"
              name="receiverName"
              value={formData.receiverName}
              onChange={onChange}
              onBlur={onBlur}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                touched.receiverName && errors.receiverName
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-secondary focus:ring-opacity-20'
              }`}
              placeholder="Enter receiver's name"
            />
            {touched.receiverName && errors.receiverName && (
              <p className="mt-2 text-sm text-red-600">{errors.receiverName}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight" className="block text-sm font-semibold text-textDark mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={onChange}
              onBlur={onBlur}
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                touched.weight && errors.weight
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-secondary focus:ring-opacity-20'
              }`}
              placeholder="Enter weight"
            />
            {touched.weight && errors.weight && (
              <p className="mt-2 text-sm text-red-600">{errors.weight}</p>
            )}
          </div>

          {/* Box Color */}
          <div>
            <label htmlFor="boxColor" className="block text-sm font-semibold text-textDark mb-2">
              Box Colour
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                id="boxColor"
                name="boxColor"
                value={formData.boxColor}
                onChange={onChange}
                className="h-12 w-24 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-lg border-2 border-gray-300" style={{ backgroundColor: formData.boxColor }} />
                <span className="text-sm font-medium text-gray-700">RGB: {hexToRgb(formData.boxColor)}</span>
              </div>
            </div>
          </div>

          {/* Destination Country */}
          <div>
            <label htmlFor="destinationCountry" className="block text-sm font-semibold text-textDark mb-2">
              Destination Country
            </label>
            <select
              id="destinationCountry"
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={onChange}
              onBlur={onBlur}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white ${
                touched.destinationCountry && errors.destinationCountry
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-secondary focus:ring-opacity-20'
              }`}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {touched.destinationCountry && errors.destinationCountry && (
              <p className="mt-2 text-sm text-red-600">{errors.destinationCountry}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
              isFormValid
                ? 'bg-primary text-white hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Box
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default AddBoxView;
