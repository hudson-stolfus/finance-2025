import React from "react";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900">X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
