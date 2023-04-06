import React from 'react';
import ReactDOM from 'react-dom';

// styles
import mStyles from './modal.module.css';

// ya
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// #react-modals находится в public/index.html
const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {

    const overlayRef = React.useRef(null);

    function close(e) {
        if (overlayRef?.current?.className === e?.target?.className) 
            props.setVisible(false);
    }

    function closeIconClick(){
        props.setVisible(false);        
    }

    return ReactDOM.createPortal((
        <>
            <ModalOverlay click={close} ref={overlayRef}>
                <div className={`${mStyles.modalContent} pt-10 pr-10 pl-10 pb-15`}>
                    <ModalHeader header={props.header} closeClick={closeIconClick} />
                </div>
            </ModalOverlay>
        </>
    ), modalRoot);

}

const ModalOverlay = React.forwardRef(({ children, click }, ref) => {
    return (
        <div className={mStyles.modalOverlay} onClick={click} ref={ref} >
            {children}
        </div>
    );
});

const ModalHeader = ({ header, closeClick }) => (
    <div style={{ display: "flex", width: "100%" }}>
        <div className="text text_type_main-medium" style={{ display: 'flex', flexGrow: 1 }} >
            {header}
        </div>
        <div style={{ alignSelf: "flex-end", display: 'flex', justifyContent: "flex-end", flexGrow: 1 }}>
            <span onClick={closeClick} style={{ cursor: "pointer" }}>
                <CloseIcon type="default"  />
            </span>
        </div>
    </div>
);