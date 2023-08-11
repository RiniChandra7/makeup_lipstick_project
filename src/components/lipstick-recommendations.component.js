import React, { useContext, useEffect, useState } from "react";
import '../App.css';
import { ProductContext } from "../contexts/product-data.context";
import FeatureCard from "./feature-card.component";
import ShadeTable from "./shade-table.component";
import { Table, Form } from 'react-bootstrap';

function LipstickRecommendations() {
    const {selectedSkinTone, allShadesList, colorFamilies} = useContext(ProductContext);
    const [recommendedShades, setRecommendedShades] = useState([]);
    const [colorFamily, setColorFamily] = useState("");

    function calculateLuminance(r, g, b) {
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function isLipstickDarkerAndBalanced(selectedSkinTone, lipstickColor) {
        const skinLuminance = calculateLuminance(selectedSkinTone.r, selectedSkinTone.g, selectedSkinTone.b);
        const lipstickLuminance = calculateLuminance(lipstickColor.rgb.r, lipstickColor.rgb.g, lipstickColor.rgb.b);
        const luminanceDifference = skinLuminance - lipstickLuminance;
      
        //console.log(selectedSkinTone);
        //console.log(lipstickColor);
        const skinRedToBlueRatio = selectedSkinTone.r / selectedSkinTone.b;
        const lipstickRedToBlueRatio = lipstickColor.rgb.r / lipstickColor.rgb.b;
      
        const redBlueRatioDifference = Math.abs(skinRedToBlueRatio - lipstickRedToBlueRatio);

        if (luminanceDifference >= 60 && redBlueRatioDifference <= 0.1) {
            console.log("Luminance diff: "+luminanceDifference);
            console.log("RB diff: " + redBlueRatioDifference);
            console.log(lipstickColor);

            return true;
        }

        return false;
    }

    function colorFamilySelectHandler(e) {
        //let filteredShades = recommendedShades.filter(lipstickColor => lipstickColor.colorFamily == e.target.value);
        //setRecommendedShades(filteredShades);
        setColorFamily(e.target.value);
    }

    useEffect(() => {
        let filteredShades = allShadesList.current.filter(lipstickColor => {
            return isLipstickDarkerAndBalanced(selectedSkinTone, lipstickColor);
        });

        console.log(filteredShades);
        setRecommendedShades(filteredShades);
    }, [selectedSkinTone]);

    return (
        <div className="App">
            <FeatureCard>
                <Table striped bordered hover>
                    <tbody>
                        {
                            selectedSkinTone &&
                            <>
                                <tr style={{border: '1px solid black'}}>
                                    <th colSpan={2}>
                                        Selected skin tone
                                    </th>
                                </tr>
                                <tr style={{border: '1px solid black'}}>
                                    <td colSpan={2} style={{
                                        height: '50px',
                                        backgroundColor: `rgb(${selectedSkinTone.r}, ${selectedSkinTone.g}, ${selectedSkinTone.b})`,
                                        border: '2px solid black',
                                        }}>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Form.Group controlId="color-family-dropdown">
                                            <Form.Label className="dropdown-label">Select your required color family from below to filter results</Form.Label>
                                            <Form.Control as="select" className="border" onChange={colorFamilySelectHandler} value={colorFamily}>
                                            <option value="">Select a color family</option>
                                            {
                                                colorFamilies.current.map((option, optionIndex) => (
                                                    <option key={optionIndex} value={option}>{option}</option>
                                                ))
                                            }
                                            </Form.Control>
                                        </Form.Group>
                                    </td>
                                </tr>
                            </>
                        }
                        <ShadeTable matchResults={recommendedShades.filter(lipstickColor => lipstickColor.colorFamily == colorFamily || colorFamily.length == 0).sort((a, b) => calculateLuminance(a.rgb) - calculateLuminance(b.rgb))} />
                    </tbody>
                </Table>
            </FeatureCard>
        </div>
    );
}

export default LipstickRecommendations;