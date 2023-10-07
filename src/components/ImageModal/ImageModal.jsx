import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './ImageModal.scss';


const ExpandableImage = ({ imageUrl }) => {

    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <img
                src={imageUrl}
                className="img-fluid mb-3 p-0 w-100 clickable-image"
                style={{ cursor: 'pointer', maxHeight: '60vh' }}
                alt="Product"
                onClick={handleImageClick}
            />
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                contentLabel="Image Modal"
                className="image-modal"
            >
                    <div className="modal-body p-0">
                        <img
                            src={imageUrl}
                            className="img-fluid p-0 w-100"
                            alt="Product"
                            style={{ maxHeight: '80vh' }}
                        />
        </div>
            </Modal>
        </div>
    );
}

export default ExpandableImage;
