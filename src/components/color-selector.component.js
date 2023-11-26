import React, { useContext, useEffect, useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { ProductContext } from '../contexts/product-data.context';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ColorDropdown = ({sourceIsSwatchSubmit}) => {
  const [searchText, setSearchText] = useState("");
  const {collectionShades, setCollectionShades, brand, selectedMatchColor, setSelectedMatchColor} = useContext(ProductContext);
  const [matchedColors, setMatchedColors] = useState(collectionShades);
  const [selectedColor, setSelectedColor] = useState({});
  const [image, setImage] = useState(null);

  const handleColorChange = (color) => {
    console.log(color);
    setSelectedColor(color);
    setSelectedMatchColor(color);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("uid", "sampleUid1");
    formData.append("brand", selectedColor.brand);
    formData.append("collection", selectedColor.collection);
    formData.append("shade", selectedColor.colour_name);
    formData.append("pic", image);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

      const response = await axios.post(`${apiUrl}/swatches`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Swatch created:', response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setMatchedColors(collectionShades.filter((c) => c.colour_name.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText, collectionShades]);

  useEffect(() => {
    setCollectionShades([]);
  }, [brand]);

  //effect in place to reset the selected color when the user changes collections
  /*useEffect(() => {
    setSelectedColor({});
  }, [collectionShades]);*/

  const colorElement = matchedColors.map((color, index) => (
    <tr key={index} onClick={() => handleColorChange(color)}>
      <td style={{ backgroundColor: color.hex_value }} className="color-option"></td>
      <td className="color-name">{color.colour_name}</td>
    </tr>
  ));

  const selectedColorData = 
  selectedColor.brand && selectedColor.collection && selectedColor.colour_name && selectedColor.hex_value &&
  <>
    <tr style={{border: '1px solid black'}}>
      <th style={{backgroundColor: selectedColor.hex_value}} colSpan={2}></th>
    </tr>
    <tr style={{border: '1px solid black'}}>
      <th colSpan={2}>Selected color: 
        {
          " " + selectedColor.brand.charAt(0).toUpperCase() + 
          selectedColor.brand.substring(1).toLowerCase() + 
          " " + selectedColor.collection + " (" + 
          selectedColor.colour_name + ")"
        }
      </th>
    </tr>
    {
      !sourceIsSwatchSubmit && 
      <>
        <tr style={{border: '1px solid black'}}>
          <td colSpan={2}>
            <Link to='/shade-matches' disabled={selectedColor.hex_value}>
              <Button variant='primary'>Get Matches</Button>
            </Link>
          </td>
        </tr>
      </>
    }
    {
      sourceIsSwatchSubmit && 
      <>
        <tr style={{border: '1px solid black'}}>
          <td colSpan={2}>
            <input type="file" name='pic' accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </td>
        </tr>
        <tr style={{border: '1px solid black'}}>
          <td colSpan={2}>
            <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
          </td>
        </tr>
      </>
    }
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
