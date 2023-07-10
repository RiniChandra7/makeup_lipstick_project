import React from "react";
import '../styles/feature-card.css';

const FeatureCard = ({children}) => {
    return (
        <div className="card">
          <div className="card-body">
            {children}
          </div>
        </div> 
    );
};

export default FeatureCard;