import React from 'react';
import './CustomInput.css';

interface CustomInputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select';
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  readOnly?: boolean;  
  style?: React.CSSProperties; 
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  placeholder,
  required = false,
  value,
  onChange,
  options = [],
  readOnly,
   style
}) => {
  return (
    <div className="custom-input-container">
      <label className="custom-input-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      {type === 'select' ? (
        <select className="custom-input-select" value={value} onChange={onChange} required={required}>
          <option value="" disabled>{placeholder || 'Selecione uma opção'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="custom-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          readOnly={readOnly}  // Aplicando o readOnly aqui
          style={style}  // Aplicando o estilo customizado aqui
        />
      )}
    </div>
  );
};

export default CustomInput;
