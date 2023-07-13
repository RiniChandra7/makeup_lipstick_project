import React, { useContext, useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { ProductContext } from '../contexts/product-data.context';

const ColorDropdown = () => {
  const [selectedColor, setSelectedColor] = useState({});
  const [searchText, setSearchText] = useState("");
  const {collectionShades, setCollectionShades, brand, productName} = useContext(ProductContext);
  const [matchedColors, setMatchedColors] = useState(collectionShades);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    setMatchedColors(collectionShades.filter((c) => c.colour_name.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText, collectionShades]);

  useEffect(() => {
    setCollectionShades([]);
  }, [brand]);

  const colorElement = matchedColors.map((color, index) => (
    <tr key={index} onClick={() => handleColorChange(color)}>
      <td style={{ backgroundColor: color.hex_value }} className="color-option"></td>
      <td className="color-name">{color.colour_name}</td>
    </tr>
  ));

  const selectedColorData = 
  <>
    <tr style={{border: '1px solid black'}}>
      <th style={{backgroundColor: selectedColor.hex_value}} colSpan={2}></th>
    </tr>
    <tr style={{border: '1px solid black'}}>
      <th colSpan={2}>Selected color: 
        {
          " " + brand.charAt(0).toUpperCase() + 
          brand.substring(1).toLowerCase() + 
          " " + productName + " (" + 
          selectedColor.colour_name + ")"
        }
      </th>
    </tr>
  </>;

  return (
    <div className="color-dropdown">
      <Form.Label className="dropdown-label">Click on a shade below to select it</Form.Label>
      <Form.Group controlId="colorSearch">
        <Form.Control
          type="text"
          placeholder="Search color..."
          value={searchText}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <Table striped bordered hover style={{marginTop: '20px'}}>
        <tbody>
            {selectedColor.hex_value && selectedColorData}
            {colorElement}
        </tbody>
      </Table>
    </div>
  );
};

export default ColorDropdown;
