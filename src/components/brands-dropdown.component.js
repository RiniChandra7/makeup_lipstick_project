import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/product-data.context";

const BrandsDropdown = () => {
    const {productsList, brand, setBrand} = useContext(ProductContext);
    const [brandsList, setBrandsList] = useState([]);

  useEffect(() => {
    if (productsList.current.length > 0) {
      //console.log(productsList);
      const uniqueBrands = Array.from(
        new Set(productsList.current.map((p) => capitalize(p.productBrand)))
      );
      console.log(uniqueBrands);
      setBrandsList(uniqueBrands);
    }
  }, [productsList.current]);

    const capitalize = (str) => {
        if (str.length > 0) {
            return str.charAt(0).toUpperCase() + str.substring(1);
        }
        return "";
    }

    console.log(brandsList);

    return (
        <>
        <p>Brands</p>
        </>
    );
};

export default BrandsDropdown;