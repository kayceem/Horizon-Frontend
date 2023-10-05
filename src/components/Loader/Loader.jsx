import React from 'react'
import { FadeLoader } from 'react-spinners';

const Loader = ({height=true}) => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: `${height ? '70vh' : '50px'}` }}>
            <FadeLoader color="#000000" size={50} />
        </div>
    )
}

export default Loader;