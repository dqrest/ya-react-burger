import { useMemo, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// components
import Modal from '../../components/modal/modal';
import OrderContent from '../../components/order-content/order-content';

// shared
import { WS_CONNECTION_START_TO_ALL_ORDERS } from '../../services/action-types/wsocket';

export const FeedItemPage = () => {
    return <OrderContent connection={WS_CONNECTION_START_TO_ALL_ORDERS} />
};

export const ModalFeedItemPage = () => {
    const navigate = useNavigate();
    return (
        <Modal 
            setVisible={() => { navigate('/feed'); }}>
            <FeedItemPage/>
        </Modal>
    );
}


