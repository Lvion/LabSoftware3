import React from 'react';
import './CustomButton.css';

interface CustomButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, type = 'button', onClick, disabled = false }) => {
  return (
    <button className="custom-button" type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default CustomButton;
