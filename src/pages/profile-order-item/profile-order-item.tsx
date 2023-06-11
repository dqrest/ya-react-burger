import { useNavigate } from 'react-router-dom';

// components
import Modal from '../../components/modal/modal';
import OrderContent from '../../components/order-content/order-content';

// shared
import { WS_CONNECTION_START_TO_USER_ORDERS } from '../../services/action-types/wsocket';


export const ProfileOrderItemPage = () => {
    return <OrderContent connection={WS_CONNECTION_START_TO_USER_ORDERS} />
}

export const ModalProfileOrderItemPage = () => {
    const navigate = useNavigate();
    return (
        <Modal
            setVisible={() => { navigate('/profile/orders'); }}>
            <ProfileOrderItemPage/>
        </Modal>
    );
}