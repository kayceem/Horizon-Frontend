import React from 'react'
import { FadeLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <FadeLoader color="#000000" size={50} />
        </div>
    )
}

export default Loader;