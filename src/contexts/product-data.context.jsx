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
    setCollectionShades: () => {}
});

export const ProductProvider = ({children}) => {
    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [productId, setProductId] = useState(-1);
    const [collectionShades, setCollectionShades] = useState([]);
    const productsList = useRef([]);

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
                        }
                        return prod;
                    });
                })
            }
        }
        getDataHelper();
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
        setCollectionShades
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

