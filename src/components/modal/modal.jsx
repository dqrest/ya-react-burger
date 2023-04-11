import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// ya
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// components
import ModalOverlay from '../modal-overlay/modal-overlay';

// styles
import mStyles from './modal.module.css';

// #react-modals находится в public/index.html
const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {

    const overlayRef = React.useRef(null);

    React.useEffect(() => {
        // Нажали на Escape ---> скрыть Modal
        const handleEscapeKey = event =>
            event?.code === 'Escape' && props?.setVisible(false);
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, []);

    function close(e) {
        // buttonclick не на modal ---> скрыть Modal
        if (overlayRef?.current?.className === e?.target?.className)
            props.setVisible(false);
    }

    function closeIconClick() {
        props.setVisible(false);
    }

    return ReactDOM.createPortal((
        <>
            <ModalOverlay click={close} ref={overlayRef}>
            </ModalOverlay>
            <div className={`${mStyles.modalContent} pt-10 pr-10 pl-10 pb-15`}>
                <ModalHeader header={props.header} closeClick={closeIconClick} />
                {props.children}
            </div>
        </>
    ), modalRoot);
}


const ModalHeader = ({ header, closeClick }) => (
    <div style={{ display: "flex", width: "100%" }}>
        <div className="text text_type_main-medium" style={{ display: 'flex', flexGrow: 1 }} >
            {header}
        </div>
        <div style={{ alignSelf: "flex-end", display: 'flex', justifyContent: "flex-end", flexGrow: 1 }}>
            <span onClick={closeClick} style={{ cursor: "pointer" }}>
                <CloseIcon type="default" />
            </span>
        </div>
    </div>
);

ModalHeader.propTypes = {
    header: PropTypes.string.isRequired,
    closeClick: PropTypes.func.isRequired
};

Modal.propTypes = {
    setVisible: PropTypes.func.isRequired,
    header: PropTypes.string
}

