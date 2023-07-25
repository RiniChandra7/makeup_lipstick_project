import { useContext, useEffect, useRef, useState } from 'react';
import '../App.css';
import { ProductContext } from '../contexts/product-data.context';
import FeatureCard from './feature-card.component';
import '../styles/feature-card.css';
import { Table } from 'react-bootstrap';


function ShadeMatches() {
    const {allShadesList, selectedMatchColor, hexToRgb} = useContext(ProductContext);
    const [matchResults, setMatchResults] = useState([]);

    //only taking colors with <=5% deviation in r, g and b
    const compareRgbValues = (clr) => {
        let selectedMatchColorRgb = hexToRgb(selectedMatchColor.hex_value);

        if (clr.productBrand.toLowerCase() != selectedMatchColor.brand.toLowerCase() &&
            clr.productName.toLowerCase() != selectedMatchColor.collection.toLowerCase() &&
            clr.rgb.r <= selectedMatchColorRgb.r + 13 && clr.rgb.r >= selectedMatchColorRgb.r - 13 &&
            clr.rgb.g <= selectedMatchColorRgb.g + 13 && clr.rgb.g >= selectedMatchColorRgb.g - 13 &&
            clr.rgb.b <= selectedMatchColorRgb.b + 13 && clr.rgb.b >= selectedMatchColorRgb.b - 13) {
                clr.dissimilarityIndex = ((Math.abs(clr.rgb.r - selectedMatchColorRgb.r)) +
                                            (Math.abs(clr.rgb.g - selectedMatchColorRgb.g) +
                                            (Math.abs(clr.rgb.b - selectedMatchColorRgb.b)))) / 3.0;

                
                /*console.log(clr);
                console.log(selectedMatchColorRgb);
                console.log("matched");*/
                return true;
            }
    }

    useEffect(() => {
        if (selectedMatchColor.hex_value) {
            let matches = allShadesList.current.filter(compareRgbValues);
            matches.sort((clr1, clr2) => clr1.dissimilarityIndex - clr2.dissimilarityIndex);
            console.log(matches);
            setMatchResults(matches);
        }
        else {
            console.log(window.location);
            window.location.href = window.location.origin + "/dupe-finder";
        }
    }, [selectedMatchColor]);

    return (
        <div className="App">
            <FeatureCard>

                <Table striped bordered hover style={{marginTop: '20px'}}>
                    <tbody>
                        {
                            selectedMatchColor.brand && selectedMatchColor.collection && selectedMatchColor.colour_name && selectedMatchColor.hex_value &&
                            <>
                                <tr style={{border: '1px solid black'}}>
                                    <th style={{backgroundColor: selectedMatchColor.hex_value}} colSpan={2}></th>
                                </tr>
                                <tr style={{border: '1px solid black'}}>
                                    <th colSpan={2}>
                                        Selected color:
                                        {
                                            " " + selectedMatchColor.brand.charAt(0).toUpperCase() + 
                                            selectedMatchColor.brand.substring(1).toLowerCase() + 
                                            " " + selectedMatchColor.collection + " (" + 
                                            selectedMatchColor.colour_name + ")"
                                        }
                                    </th>
                                </tr>
                            </>
                        }
                        
                        {
                            matchResults.length &&
                            <tr style={{border: '1px solid black'}}>
                                <th colSpan={2} style={{color: '#b07082'}}>
                                    We've found {matchResults.length} {matchResults.length > 1 ? 'results' : 'result'} with less than 5% of dissimilarity. {matchResults.length > 1 ? 'Listing them starting with the most similar ones... ' : ''}
                                </th>
                            </tr>
                        }
                        
                    {
                        matchResults.length ?
                            (
                                matchResults.map((color, index) => (
                                    <tr key={index}>
                                        <td style={{ backgroundColor: color.shadeHexCode, width: '20%' }}></td>
                                        <td className="color-name">
                                            Brand: {color.productBrand.charAt(0).toUpperCase() + color.productBrand.substring(1).toLowerCase()}
                                            <br />
                                            Collection: {color.productName}
                                            <br />
                                            Shade name: {color.shadeName}
                                            <br />
                                        </td>
                                    </tr>
                            )))
                            : (
                                <tr>
                                    <td>
                                        No close matches found.
                                    </td>
                                </tr>
                            )
                    }
                    </tbody>
                </Table>
            </FeatureCard>
        </div>
    );
}

export default ShadeMatches;
