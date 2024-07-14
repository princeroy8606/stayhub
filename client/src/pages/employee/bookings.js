import React from 'react';
import BookingsDetails from '../../components/owner/bookings/BookingsDetails';
import SiderBar from '../../components/owner/siderBar';

const Bookings = () => {
  return (
    <div className='owner-cont' >
        <SiderBar/>
        <BookingsDetails/>
    </div>
  )
}

export default Bookings;
