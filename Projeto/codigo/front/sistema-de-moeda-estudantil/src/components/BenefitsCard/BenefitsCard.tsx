import { Benefit } from '../../types/Benefits';
import CustomButton from '../CustomButton/CustomButton';
import './BenefitsCard.css';


const BenefitsCard = ({ nome, descricao, custoEmMoedas }: Benefit) => {
    return (
        <div className='benefits-card'>
            <div className='benefits-card-info'>
                <h3>{nome}</h3>
                <p>{descricao}</p>
                <p>Valor: {custoEmMoedas}</p>
                <div className='benefits-actions'>
                    <CustomButton label="Comprar benefício" type="submit" />
                </div>
            </div>
        </div>
    );
}

export default BenefitsCard;