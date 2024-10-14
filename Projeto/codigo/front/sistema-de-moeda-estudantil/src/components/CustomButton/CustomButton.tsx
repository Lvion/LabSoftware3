import React from 'react';
import './CustomButton.css';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button className="custom-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default CustomButton;
