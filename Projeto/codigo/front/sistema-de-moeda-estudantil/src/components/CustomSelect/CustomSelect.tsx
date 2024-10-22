import React from 'react';
import './CustomSelect.css';

interface CustomSelectProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, options, required }) => {
    return (
        <div className="custom-select-container">
            <label className="custom-select-label">
                {label} {required && <span className="required-star">*</span>}
            </label>
            <select className="custom-select" value={value} onChange={onChange} required={required}>
                <option value="">Selecione uma opção</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;
