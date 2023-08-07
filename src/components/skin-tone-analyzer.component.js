import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const SkinToneAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [topSkinColors, setTopSkinColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  // Function to check if a color is within the skin-like color range
  const isSkinToneColor = (r, g, b) => {
    // Define the skin-like color range
    const minRed = 100;
    const maxRed = 255;
    const minGreen = 50;
    const maxGreen = 220;
    const minBlue = 0;
    const maxBlue = 170;

    return r >= minRed && r <= maxRed && g >= minGreen && g <= maxGreen && b >= minBlue && b <= maxBlue;
  };

  /*useEffect(() => {

  }, [selectedImage]);

  const setAllColorsHandler = (skinColorOccurrences) => {
    // Sort skin-like colors by occurrence in descending order
    const sortedColors = Object.entries(skinColorOccurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Get the top 5 skin-like colors

    console.log(sortedColors);
    const [selectedColorRed, selectedColorGreen, selectedColorBlue] = sortedColors[0][0].split('-').map(Number);
    const selColor = {
        r: selectedColorRed,
        b: selectedColorBlue,
        g: selectedColorGreen
    };

    setTopSkinColors(sortedColors);
    setSelectedColor(selColor); // Set the initially selected color to the first color in the top 5 list
  }
  */

  // Function to handle the image upload and analysis
  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (readerEvent) {
      const image = new Image();

      image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height);

        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        // Object to store skin-like color occurrences
        const skinColorOccurrences = {};

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (isSkinToneColor(r, g, b)) {
            // Convert RGB values to a unique string to use as a key
            const colorKey = `${r}-${g}-${b}`;

            // Increment the occurrence count for this color
            skinColorOccurrences[colorKey] = (skinColorOccurrences[colorKey] || 0) + 1;
          }
        }

        // Sort skin-like colors by occurrence in descending order
        const sortedColors = Object.entries(skinColorOccurrences)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5); // Get the top 5 skin-like colors

        setTopSkinColors(sortedColors);
        setSelectedColor(sortedColors[0][0]); // Set the initially selected color to the first color in the top 5 list
      };

      image.src = readerEvent.target.result;
      setSelectedImage(readerEvent.target.result);
    };

    reader.readAsDataURL(imageFile);
  };

  const handleColorSelect = (color) => {
    console.log(color);
    const [selectedColorRed, selectedColorGreen, selectedColorBlue] = color.split('-').map(Number);
    const selColor = {
        r: selectedColorRed,
        b: selectedColorBlue,
        g: selectedColorGreen
    };

    setSelectedColor(selColor);
  }

  return (
    <div style={{textAlign: "left"}}>
      <b>Upload a zoomed in image of your skin</b>
      <p>
        <b>Tip:</b>The detected colors are sensitive to lighting conditions and picture clarity. Please try again with an image of your facial skin,
        zoomed in, preferably in neutral white lighting.
      </p>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '100%', marginTop: '10px', height: '50px' }} />}
      <br />
      {topSkinColors.length > 0 && (
        <div>
          <p>Choose a color that is closest to your skin tone:</p>
          <Row>
            {topSkinColors.map(([colorKey, occurrences], index) => {
                const [r, g, b] = colorKey.split('-').map(Number);
                const colorStyle = {
                height: '50px',
                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                border: r === selectedColor.r && g === selectedColor.g && b === selectedColor.b ? '2px solid red' : 'none', // Highlight the selected color
                };
                return (
                    <Col key={index}>
                        <div key={index} style={colorStyle} onClick={() => handleColorSelect(colorKey)}></div>
                    </Col>
                );
            })}
          </Row>
        </div>
      )}
      {selectedColor && (
        <div>
          <b>Selected Color:</b>
          <div
            style={{
              height: '50px',
              backgroundColor: `rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`,
              border: '2px solid black',
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SkinToneAnalyzer;
