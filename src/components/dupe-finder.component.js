import '../App.css';
import BrandsDropdown from './brands-dropdown.component';
import { ProductContext } from "../contexts/product-data.context";
import React, { useContext, useEffect, useState } from "react";

function DupeFinder() {
  const {productsList} = useContext(ProductContext);
  return (
    <div className="App">
      <BrandsDropdown />
    </div>
  );
}

export default DupeFinder;
