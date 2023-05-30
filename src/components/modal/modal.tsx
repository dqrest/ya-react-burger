import React, { FC, useEffect, useRef, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';

// ya
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

// components
import ModalOverlay from '../modal-overlay/modal-overlay';

// styles
import mStyles from './modal.module.css';

// #react-modals находится в public/index.html
const modalRoot = document.getElementById("react-modals");

type TModal = {
    setVisible: Function;
    header?: string;
    children: React.ReactNode;
};

type TModalHeader =  {
    header?: string;
    closeClick: MouseEventHandler;
};

const Modal: FC<TModal> = ({ children, ...props }) => {

    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Нажали на Escape ---> скрыть Modal
        const handleEscapeKey = (event: KeyboardEvent) =>
            event?.code === 'Escape' && props?.setVisible(false);
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [props]);

    const close: MouseEventHandler = (e) => {
        // buttonclick не на modal ---> скрыть Modal        
        const target = e?.target as HTMLElement;
        if (overlayRef?.current?.className === target?.className)
            props.setVisible(false);
    }     

    const closeIconClick: MouseEventHandler = (e) => {        
        props.setVisible(false);
    }  

    return modalRoot
        ? ReactDOM.createPortal((
            <>
                <ModalOverlay click={close} ref={overlayRef} />
                <div className={`${mStyles.modalContent} pt-10 pr-10 pl-10 pb-15`}>
                    <ModalHeader header={props.header} closeClick={closeIconClick} />
                    {children}
                </div>
            </>
        ), modalRoot)
        : <div>modalRoot is undefined for portal.</div>;
}


const ModalHeader: FC<TModalHeader> = ({ header, closeClick }) => (
    <div className={mStyles.modalHeaderWrapper}>
        <div className={`text text_type_main-medium ${mStyles.modalHeaderTitle}`}>
            {header}
        </div>
        <div className={mStyles.modalHeaderCloseIconWrapper}>
            <span onClick={closeClick} className={mStyles.modalHeaderCloseIcon} >
                <CloseIcon type={'primary'} />
            </span>
        </div>
    </div>
);

export default Modal;

