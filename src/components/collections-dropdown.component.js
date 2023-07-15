import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/product-data.context";
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/feature-card.css';
import ColorDropdown from "./color-selector.component";

const CollectionsDropdown = () => {
    const {productsList, brand, productName, setProductName, collectionShades, setCollectionShades} = useContext(ProductContext);
    const [collectionsList, setCollectionsList] = useState([]);
    const [curProductName, setCurProductName] = useState("");

    useEffect(() => {
        if (brand.length > 0 && productsList.current.length > 0) {
            const data = productsList.current.filter(prod => prod.productBrand === brand);
            console.log(data);
            let collections = data.map(({productId, productName, productShades}) => ({productId, productName, productShades}));
            collections = collections.filter((col) => col.productShades.length > 0);
            console.log(collections);
            setCollectionsList(collections);
        }
    }, [brand]);

    const collectionSelectHandler = (e) => {
      console.log(e.target.value);
      if (e.target.value != "Select a collection") {
        let shades = collectionsList.filter(c => c.productName == e.target.value).map(({productShades}) => ({productShades}));
        console.log(shades[0].productShades);
        let finShades = shades[0].productShades.map((shade) => {
            let obj = {};
            obj.colour_name = shade.colour_name;
            obj.hex_value = shade.hex_value;
            obj.brand = brand;
            obj.collection = e.target.value;

            return obj;
        });
        console.log(finShades);
        setCollectionShades(finShades);
        setCurProductName(e.target.value);
        setProductName(e.target.value);
      }
    };

    return (
        <div>
            <Form.Group controlId="collections-dropdown">
                <Form.Label className="dropdown-label">Select a collection from the dropdown below</Form.Label>
                <Form.Control as="select" className="border" onChange={collectionSelectHandler} value={curProductName}>
                <option value="Select a collection">Select a collection</option>
                {collectionsList.map(({productId, productName}) => (
                    <option key={productId} value={productName}>{productName}</option>
                ))}
                </Form.Control>
            </Form.Group>
        </div>
    );
};

export default CollectionsDropdown;