import React from 'react'
import {LiaRobotSolid} from 'react-icons/lia';
const Error404 = ({element='Page'}) => {
  return (
    <div>
      <h2 style={{fontSize: '120px'}} className='d-flex align-items-center'>404
      <LiaRobotSolid  />
      </h2>
      <h2 className='d-flex align-items-center justify-content-center'>{element} not found</h2>
    </div>
  )
}

export default Error404;