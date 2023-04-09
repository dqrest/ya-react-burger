import React from 'react';

// styles
import mStyles from '././modal-overlay.module.css';

const ModalOverlay = React.forwardRef(({ click }, ref) => {
    return (        
        <div className={mStyles.modalOverlay} onClick={click} ref={ref}></div>
    );
});

export default ModalOverlay;