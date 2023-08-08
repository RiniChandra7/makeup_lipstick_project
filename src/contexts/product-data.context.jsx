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
    setSelectedSkinTone: () => {}
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
        selectedSkinTone
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

