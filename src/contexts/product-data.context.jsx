import { createContext, useEffect, useRef, useState } from "react";

export const ProductContext = createContext({
    productsList: [],
    brand: "",
    setBrand: () => {},
    productName: "",
    setProductName: () => {},
    productId: -1,
    setProductId: () => {},
    collectionShades: [],
    setCollectionShades: () => {},
    allShadesList: [],
    brandsList: [],
    dupeFinder: true,
    hexToRgb: () => {},
    selectedMatchColor: {},
    setSelectedMatchColor: () => {},
    selectedSkinTone: {},
    setSelectedSkinTone: () => {},
    colorFamilies: []
});

export const ProductProvider = ({children}) => {
    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [productId, setProductId] = useState(-1);
    const [collectionShades, setCollectionShades] = useState([]);
    const [selectedMatchColor, setSelectedMatchColor] = useState({});
    const [selectedSkinTone, setSelectedSkinTone] = useState({});

    const productsList = useRef([]);
    const allShadesList = useRef([]);
    const brandsList = useRef([]);
    const dupeFinder = useRef(true);
    const colorFamilies = useRef(["Reds", "Pinks", "Browns", "Purples"]);
    const colorFamilyCodes = {
        "Reds": [
            {
                //Light red
                r: 255, g: 114, b: 118
            },
            {
                //Cherry red
                r: 205, g: 0, b: 26
            },
            {
                //Rustic red
                r: 84, g: 11, b: 12
            }
        ],
        "Pinks": [
            {
                //Light pink
                r: 245, g: 218, b: 223
            },
            {
                //Cotton candy pink
                r: 255, g: 188, b: 217
            },
            {
                //Highlighter pink
                r: 255, g: 20, b: 147
            },
            {
                //Deep pink
                r: 214, g: 37, b: 152
            }
        ],
        "Browns": [
            {
                //Light brown
                r: 189, g: 154, b: 122
            },
            {
                //Maple
                r: 196, g: 99, b: 22
            },
            {
                //Chocolate brown
                r: 98, g: 52, b: 18
            },
            {
                //Rich brown
                r: 50, g: 26, b: 24
            }
        ],
        "Purples": [
            {
                //Light purple
                r: 197, g: 180, b: 227
            },
            {
                //Light zerg purple
                r: 166, g: 81, b: 126
            },
            {
                //Neon purple
                r: 199, g: 36, b: 177
            },
            {
                //Violet
                r: 155, g: 38, b: 182
            }
        ]
    };

    function calculateColorDistance(color1, color2) {
        const rDiff = color1.r - color2.r;
        const gDiff = color1.g - color2.g;
        const bDiff = color1.b - color2.b;
      
        return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
    }
      
    function findClosestColorFamily(targetColor) {
        let closestFamily = null;
        let minDistance = Number.MAX_VALUE;
      
        for (const family in colorFamilyCodes) {
          for (const color of colorFamilyCodes[family]) {
            const distance = calculateColorDistance(targetColor, color);
            if (distance < minDistance) {
              minDistance = distance;
              closestFamily = family;
            }
          }
        }
      
        return closestFamily;
    }

    const hexToRgb = (hexCode) => {
        const hexValue = hexCode.toString().replace("#", "");
        const r = parseInt(hexValue.substr(0, 2), 16);
        const g = parseInt(hexValue.substr(2, 2), 16);
        const b = parseInt(hexValue.substr(4, 2), 16);

        const rgb = {};
        rgb.r = r;
        rgb.g = g;
        rgb.b = b;

        return rgb;
    }

    useEffect(() => {
        const getDataHelper = async () => {
            if (productsList.current.length === 0) {
                await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick')
                .then(response => {
                    console.log("Full Api called");
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    productsList.current = data.map((p) => {
                        const prod = {};
                        if (p != undefined && p.product_api_url != "") {
                            prod.productId = p.id;
                            prod.productBrand = p.brand;
                            prod.productName = p.name;
                            prod.productInfo = p.product_link;
                            prod.productDescription = p.description;
                            prod.productApiUrl = p.product_api_url;
                            prod.productShades = p.product_colors;

                            if (prod.productShades.length > 0) {
                                const currentShades = prod.productShades.map((shade) => {
                                    const shadeObj = {};
                                    shadeObj.productBrand = prod.productBrand;
                                    shadeObj.productName = prod.productName;
                                    shadeObj.shadeName = shade.colour_name;
                                    shadeObj.shadeHexCode = shade.hex_value;
                                    shadeObj.rgb = hexToRgb(shade.hex_value);
                                    shadeObj.colorFamily = findClosestColorFamily(shadeObj.rgb);
                                    return shadeObj;
                                });
                                allShadesList.current = [...allShadesList.current, ...currentShades];
                            }

                            if (prod.productBrand.length > 0) {
                                brandsList.current = [...brandsList.current, prod.productBrand];
                                brandsList.current = Array.from(
                                    new Set(brandsList.current.map((p) => p.charAt(0).toUpperCase() + p.substring(1)))
                                );
                            }
                        }
                        return prod;
                    });
                })
                .then(() => {
                    sessionStorage.setItem("productsList", JSON.stringify(productsList.current));
                    sessionStorage.setItem("allShadesList", JSON.stringify(allShadesList.current));
                    sessionStorage.setItem("brandsList", JSON.stringify(brandsList.current));

                    if (productsList.current.length > 0) {
                        dupeFinder.current = false;
                    }
                })
            }
        }
        
        const storedProductsList = sessionStorage.getItem("productsList");
        const storedAllShadesList = sessionStorage.getItem("allShadesList");
        const storedBrandsList = sessionStorage.getItem("brandsList");

        if (storedProductsList && storedAllShadesList && storedBrandsList) {
            // If data is available, parse and update the respective variables
            productsList.current = JSON.parse(storedProductsList);
            allShadesList.current = JSON.parse(storedAllShadesList);
            brandsList.current = JSON.parse(storedBrandsList);
            dupeFinder.current = false; // Assuming data is already available
            console.log(allShadesList.current);
        } else {
            // If data is not available in sessionStorage, fetch and store the data
            getDataHelper();
        }
    }, []);

    const value = {
        productsList,
        brand,
        setBrand,
        productName,
        setProductName,
        productId,
        setProductId,
        collectionShades,
        setCollectionShades,
        allShadesList,
        brandsList,
        dupeFinder,
        hexToRgb,
        selectedMatchColor,
        setSelectedMatchColor,
        setSelectedSkinTone,
        selectedSkinTone,
        colorFamilies
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

