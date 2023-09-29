// AddProductModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import AddProduct from './AddProduct';

// Initialize the react-modal root element
Modal.setAppElement('#root');

const AddProductModal = ({ isModalOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Add Product Modal"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Product</h5>
          <button
            type="button"
            className="close"
            onClick={closeModal}
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {/* Render your AddProduct content here */}
          {isModalOpen && <AddProduct closeModal={closeModal} />}
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
