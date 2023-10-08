import React from 'react'
import { Helmet } from 'react-helmet';
import {LiaRobotSolid} from 'react-icons/lia';
const Error404 = ({element='Page'}) => {
  return (
    <div>
      <Helmet>
        <title>404</title>
      </Helmet>
      <h2 style={{fontSize: '100px'}} className='d-flex justify-content-center align-items-center'>404
      <LiaRobotSolid  />
      </h2>
      <h2 className='d-flex align-items-center justify-content-center'>{element} not found</h2>
    </div>
  )
}

export default Error404;