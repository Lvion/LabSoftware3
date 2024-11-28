export interface CustomButtonProps {
    label: string;
    type?: 'button' | 'submit' | 'reset';
    onClick: () => void;
    disabled?: boolean;
}