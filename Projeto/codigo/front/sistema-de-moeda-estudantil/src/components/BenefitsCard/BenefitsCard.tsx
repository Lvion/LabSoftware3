import React from 'react';
import './BenefitsCard.css';

interface BenefitsCardProps {
    title: string;
    description: string;
}

const BenefitsCard = ({ title, description }: BenefitsCardProps) => {
    return (
        <div className='benefits-card'>
            <div className='benefits-card-info'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default BenefitsCard;