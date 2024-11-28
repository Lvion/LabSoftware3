import React from 'react';
import './ModalOverlay.css';
import { ModalOverlayProps } from '../../types/ModalOverlay';
import CustomButton from '../CustomButton/CustomButton';

const ModalOverlay: React.FC<ModalOverlayProps> = ({
    title,
    description,
    onConfirm,
    onCancel,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                {description && <p>{description}</p>}
                <div className="modal-buttons">
                    <CustomButton label={cancelText} onClick={onCancel} />
                    <CustomButton label={confirmText} onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
};

export default ModalOverlay;
