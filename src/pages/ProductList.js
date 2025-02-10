import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";

function ProductList(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/products");
                console.log(response.data)
                setProducts(response.data);
            } catch (error){
                console.error("Erreur de chargement des produits")
            }
        }
        void fetchProducts();
    }, []);
    return (
        <div>
            <h1>Product List</h1>
            <div>
            {products.map((product) => <ProductCard key={product.product_serial_number} product={product} />)}

            </div>
        </div>
    );
}

export default ProductList;