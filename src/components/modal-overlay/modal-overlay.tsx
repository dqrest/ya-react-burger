import { forwardRef, MouseEventHandler, ForwardedRef} from 'react';

// styles
import mStyles from '././modal-overlay.module.css';

const ModalOverlay = forwardRef<HTMLDivElement, TModalOverlay> (({ click }, ref: ForwardedRef<HTMLDivElement>) => {
    return (        
        <div className={mStyles.modalOverlay} onClick={click} ref={ref}></div>
    );
});

export default ModalOverlay;

type TModalOverlay = {
    click: MouseEventHandler<HTMLDivElement>
}