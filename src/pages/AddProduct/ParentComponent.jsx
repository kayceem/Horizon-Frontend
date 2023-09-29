import React, { useState } from 'react';
import AddProductModal from './AddProductModal';

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <AddProductModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default ParentComponent;
