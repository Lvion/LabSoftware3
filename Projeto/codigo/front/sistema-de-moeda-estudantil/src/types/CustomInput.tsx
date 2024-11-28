export interface CustomInputProps {
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