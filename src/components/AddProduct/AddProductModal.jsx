// AddProductModal.js
import React from 'react';
import Modal from 'react-modal';
import AddProduct from './AddProduct';
import './AddProduct.scss';
import {RxCross1} from 'react-icons/rx';

Modal.setAppElement('#root');

const AddProductModal = ({ isModalOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Add Product Modal"
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
      shouldCloseOnOverlayClick={false} 
    >
      <div className="modal-content scrollable-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Product Listing </h5>
          <button
            type="button"
            className="close"
            onClick={closeModal}
          >
            <RxCross1 size={'20px'}/>
          </button>
        </div>
        <div className="modal-body">
          {isModalOpen && <AddProduct closeModal={closeModal} />}
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
