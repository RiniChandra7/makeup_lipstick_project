import React, { useEffect, useState } from "react";

const BrandsDropdown = React.memo(() => {
    const [brandsList, setBrandsList] = useState([]);

    useEffect(() => {
        fetch('https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setBrandsList(data);
        })
    },
    []);
});

export default BrandsDropdown;