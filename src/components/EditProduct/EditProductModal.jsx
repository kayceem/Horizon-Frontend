// AddProductModal.js
import React from 'react';
import Modal from 'react-modal';
import EditProduct from './EditProduct';
import '../AddProduct/AddProduct.scss';
import {RxCross1} from 'react-icons/rx';

Modal.setAppElement('#root');

const EditProductModal = ({ isModalOpen, closeModal, product }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Product Modal"
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
      shouldCloseOnOverlayClick={false} 
    >
      <div className="modal-content scrollable-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Product Listing </h5>
          <button
            type="button"
            className="close"
            onClick={closeModal}
          >
            <RxCross1 size={'20px'}/>
          </button>
        </div>
        <div className="modal-body">
          {isModalOpen && <EditProduct closeModal={closeModal} product={product} />}
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;