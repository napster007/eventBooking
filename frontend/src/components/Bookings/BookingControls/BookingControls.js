import React from 'react';

import './BookingControls.css';

const bookingControls = props => {
    return (
        <div className="bookings-control">
              <button 
                className={props.activeOutputType === 'list' ? 'active' : ''} 
                onClick={props.onChange.bind(this,'list')}>
                    List
              </button>
              <button 
                className={props.activeOutputType === 'chart' ? 'active' : ''} 
                onClick={props.onChange.bind(this,'chart')}>
                    Chart
              </button>
        </div>
    );

};

export default bookingControls;