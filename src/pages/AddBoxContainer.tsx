import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoxContext } from '../context/BoxContext';
import { calculateShippingCost, getCountries } from '../utils/shippingCalculator';
import { Country } from '../types/Box';
import AddBoxView from './AddBoxView';

const AddBoxContainer: React.FC = () => {
  const navigate = useNavigate();
  const { addBox } = useBoxContext();
  const countries = getCountries();

  // Form state
  const [formData, setFormData] = useState({
    receiverName: '',
    weight: '',
    boxColor: '#4aa1ff',
    destinationCountry: '' as Country | '',
  });

  const [errors, setErrors] = useState({
    receiverName: '',
    weight: '',
    destinationCountry: '',
  });

  const [touched, setTouched] = useState({
    receiverName: false,
    weight: false,
    destinationCountry: false,
  });

  const validateField = (name: string, value: string | number): string => {
    switch (name) {
      case 'receiverName':
        return value.toString().trim() === '' ? 'Receiver name is required' : '';
      case 'weight':
        if (value === '' || value === null) return 'Weight is required';
        const weightNum = parseFloat(value.toString());
        if (isNaN(weightNum)) return 'Weight must be a valid number';
        if (weightNum < 0) return 'Negative values are not permitted';
        if (weightNum === 0) return 'Weight must be greater than 0';
        return '';
      case 'destinationCountry':
        return value === '' ? 'Destination country is required' : '';
      default:
        return '';
    }
  };

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error = validateField(name, value);

    if (name === 'weight') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue < 0) {
        // Reset weight to zero and set error
        error = 'Negative values are not permitted';
        setFormData((prev) => ({ ...prev, weight: '0' }));
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      receiverName: validateField('receiverName', formData.receiverName),
      weight: validateField('weight', formData.weight),
      destinationCountry: validateField('destinationCountry', formData.destinationCountry),
    };

    setErrors(newErrors);
    setTouched({ receiverName: true, weight: true, destinationCountry: true });

    if (Object.values(newErrors).every((err) => err === '')) {
      const weight = parseFloat(formData.weight);

      // Ensure destinationCountry is a Country (we validated it's non-empty)
      const destination = formData.destinationCountry as Country;

      const shippingCost = calculateShippingCost(weight, destination);

      addBox({
        id: Date.now().toString(),
        receiverName: formData.receiverName.trim(),
        weight,
        boxColor: formData.boxColor,
        destinationCountry: destination, // <- casted to Country to satisfy types
        shippingCost,
      });

      // Reset form
      setFormData({ receiverName: '', weight: '', boxColor: '#4aa1ff', destinationCountry: '' });
      setTouched({ receiverName: false, weight: false, destinationCountry: false });
      setErrors({ receiverName: '', weight: '', destinationCountry: '' });

      navigate('/box-list');
    }
  };

  // Determine form validity for button
  const isFormValid = () => {
    return (
      formData.receiverName.trim() !== '' &&
      formData.weight !== '' &&
      parseFloat(formData.weight) > 0 &&
      formData.destinationCountry !== '' &&
      !errors.receiverName &&
      !errors.weight &&
      !errors.destinationCountry
    );
  };

  return (
    <AddBoxView
      formData={formData}
      errors={errors}
      touched={touched}
      countries={countries}
      isFormValid={isFormValid()}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
};

export default AddBoxContainer;
