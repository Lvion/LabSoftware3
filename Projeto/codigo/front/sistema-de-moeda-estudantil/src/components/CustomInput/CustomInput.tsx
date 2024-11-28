import React from 'react';
import './CustomInput.css';
import { CustomInputProps } from '../../types/CustomInput';

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
          readOnly={readOnly}
          style={style}
        />
      )}
    </div>
  );
};

export default CustomInput;
