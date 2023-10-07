// AddProductModal.js
import React from 'react';
import Modal from 'react-modal';
import '../AddProduct/AddProduct.scss';
import {RxCross1} from 'react-icons/rx';
import ReviewUser from './ReviewUser';

Modal.setAppElement('#root');

const ReviewUserModal = ({ isModalOpen, closeModal, revieweeId }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Review User Modal"
      className="custom-modal review-modal"
      overlayClassName="custom-modal-overlay"
      shouldCloseOnOverlayClick={false} 
    >
      <div className="modal-content scrollable-content">
        <div className="modal-header">
          <h5 className="modal-title">Review User</h5>
          <button
            type="button"
            className="close"
            onClick={closeModal}
          >
            <RxCross1 size={'20px'}/>
          </button>
        </div>
        <div className="modal-body">
          {isModalOpen && <ReviewUser revieweeId={revieweeId} closeModal={closeModal} />}
        </div>
      </div>
    </Modal>
  );
};

export default ReviewUserModal;
