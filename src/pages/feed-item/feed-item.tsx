import { useNavigate } from 'react-router-dom';

// components
import Modal from '../../components/modal/modal';
import OrderContent from '../../components/order-content/order-content';

// shared
import { WS_CONNECTION_START_TO_ALL_ORDERS } from '../../services/action-types/wsocket';

// styles
import style from './feed-item.module.css';

export const FeedItemPage = () => {
    return (<div className={style.centerWrapper}>
        <OrderContent connection={WS_CONNECTION_START_TO_ALL_ORDERS} />
    </div>);
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


