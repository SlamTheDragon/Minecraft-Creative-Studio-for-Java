import { ReactComponent as Close } from '@material-design-icons/svg/filled/close.svg';
import React from 'react';
import Button from '../Button/Button';
import './Modal.scss';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const Modal = ({ isOpen, onClose, children, onMouseEnter, onMouseLeave }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="modal-background" onClick={onClose} />
            <div className="modal-content card">
                <Button classItem={'btn ctrl-btn'} onclick={onClose}><Close/></Button>
                {children}
            </div>
        </div>
    );
};

export default Modal;