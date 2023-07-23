import React from 'react';
import './index.css';

const HomeCard = ({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <div className="card" onClick={onClick}>
      <p className="heading">{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default HomeCard;
