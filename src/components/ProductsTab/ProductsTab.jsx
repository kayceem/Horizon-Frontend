import React, { useState } from 'react'
import Products from '../Products/Products';
import './ProductsTab.scss';

const ProductsTab = ({products, setProducts, isProfile}) => {
  const [activeTab, setActiveTab] = useState(isProfile ? 'all' : 'available');
  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  }


  return (
    <div className='products-tab'>
      {
        isProfile && (
      <ul className="nav nav-pills justify-content-center custom-nav-pills m-3">
        <li className="nav-item me-2">
          <button
            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabClick('all')}
          >
            All
          </button>
        </li>
        <li className="nav-item me-2">
          <button
            className={`nav-link ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => handleTabClick('available')}
          >
            Available
          </button>
        </li>
        <li className="nav-item me-2">
          <button
            className={`nav-link ${activeTab === 'sold' ? 'active' : ''}`}
            onClick={() => handleTabClick('sold')}
          >
            Sold
          </button>
        </li>
      </ul>

        )
      }
      <div className='scrollable-content'>

        <div className="tab-content mb-4">
          {activeTab === 'all' && isProfile && (
              <Products products={products} setProducts={setProducts} expand={true} profile={isProfile} />
          )}
          {activeTab === 'available' && (
            <Products products={products.filter((product) => product.available === true)} setProducts={setProducts} expand={true} profile={isProfile} />
          )}
          {activeTab === 'sold' && isProfile && (
            <Products products={products.filter((product) => product.available !== true)} setProducts={setProducts} expand={true} profile={isProfile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsTab;