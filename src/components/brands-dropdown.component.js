import React, { useContext, useEffect, useState, useRef } from "react";
import { ProductContext } from "../contexts/product-data.context";
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/feature-card.css';

const BrandsDropdown = () => {
    const {productsList, brand, setBrand, collectionShades, brandsList} = useContext(ProductContext);
    //const [brandsList, setBrandsList] = useState([]);
    const [curBrand, setCurBrand] = useState("");

  /*useEffect(() => {
    if (productsList.current.length > 0) {
      //This will capitalize the first letter of all the brand names and get only unique brands
      const uniqueBrands = Array.from(
        new Set(productsList.current.map((p) => capitalize(p.productBrand)))
      );
      console.log(uniqueBrands);
      //setBrandsList(uniqueBrands);
      brandsList.current = uniqueBrands;
    }
  }, [productsList.current]);
  */

  //On reload, this array becomes empty and we don't want to show that on the UI. So we redirect back to the origin.
  if (brandsList.current.length == 0) {
    window.location.href = window.location.origin;
  }

    const capitalize = (str) => {
        if (str.length > 0) {
            return str.charAt(0).toUpperCase() + str.substring(1);
        }
        return "";
    }

    const brandSelectHandler = (e) => {
      console.log(e.target.value);
      setCurBrand(e.target.value.toLowerCase());
      setBrand(e.target.value.toLowerCase());
    };

    return (
        <div>
          <Form.Group controlId="brands-dropdown">
            <Form.Label className="dropdown-label">Select a brand from the dropdown below</Form.Label>
            <Form.Control as="select" className="border" onChange={brandSelectHandler} value={capitalize(curBrand)}>
              <option value="Select a brand">Select a brand</option>
              {console.log(brandsList.current)}
              {brandsList.current.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>{option}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
    );
};

export default BrandsDropdown;