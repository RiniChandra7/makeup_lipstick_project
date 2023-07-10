import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/product-data.context";
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/feature-card.css';

const BrandsDropdown = () => {
    const {productsList, brand, setBrand} = useContext(ProductContext);
    const [brandsList, setBrandsList] = useState([]);

  useEffect(() => {
    if (productsList.current.length > 0) {
      //This will capitalize the first letter of all the brand names and get only unique brands
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

    const brandSelectHandler = (e) => {
      console.log(e.target.value);
      setBrand(e.target.value);
    };

    return (
        <div>
          <Form.Group controlId="dropdown1">
            <Form.Label className="dropdown-label">Select a brand from the dropdown below</Form.Label>
            <Form.Control as="select" className="border" onChange={brandSelectHandler} value={brand}>
              {brandsList.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>{option}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
    );
};

export default BrandsDropdown;