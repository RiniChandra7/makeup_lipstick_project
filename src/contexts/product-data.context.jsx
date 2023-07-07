import { createContext } from "react";

export const ProductContext = createContext({
    brandsList: [],
    brand: "",
    setBrand: () => {},
    productName: "",
    setProductName: () => {},
    productId: -1,
    setProductId: () => {}
});