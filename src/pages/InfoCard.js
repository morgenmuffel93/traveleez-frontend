import React from 'react';

  const InfoCard = (props) => {
    return (
      <div className="info-card">
        <img src={props.img} alt="card-icon"/>
        <p>{props.children}</p>
      </div>
    )
  }

export default InfoCard;