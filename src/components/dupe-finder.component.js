import '../App.css';
import BrandsDropdown from './brands-dropdown.component';
import { ProductContext } from "../contexts/product-data.context";
import React, { useContext, useEffect, useState } from "react";
import FeatureCard from './feature-card.component';

function DupeFinder() {
  const {productsList} = useContext(ProductContext);
  return (
    <div className="App">
      <FeatureCard>
        <BrandsDropdown />
      </FeatureCard>
    </div>
  );
}

export default DupeFinder;
