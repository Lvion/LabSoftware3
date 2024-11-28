import React from 'react';
import './CustomButton.css';
import { CustomButtonProps } from '../../types/CustomButton';

const CustomButton: React.FC<CustomButtonProps> = ({ label, type = 'button', onClick, disabled = false }) => {
  return (
    <button className="custom-button" type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default CustomButton;
