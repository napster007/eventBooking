import React from 'react';

import './EventItems.css';

const eventItem = (props) => (
  <li key={props.eventId} className="event__list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>
        ${props.price} - {new Date(props.date).toLocaleDateString()}
      </h2>
    </div>
    <div>
      {props.userId === props.creatorId ? (
        <p>You're the Owner of this event</p>
      ) : (
        <button className="btn">View Details</button>
      )}
    </div>
  </li>
);

export default eventItem;