import React, {useEffect, useState} from 'react';
import ProductCard from "./ProductCard";
import axios from "axios";

function BestProduct(props) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/best_product/`);
                setProducts(response.data);
            } catch (error){
                console.error("Erreur de chargement des produits")
            }

        }
        void fetchProducts();
    }, [products]);
    return (
        <section id={"s_h_product_list"}>
            <h2 className={'surtitle--b'}>Nos produits phares</h2>
            <p className={"text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </p>
            <div className={"container_product_list"}>
                {products.map((product) => <ProductCard key={product.product_serial_number} product={product}/>)}
            </div>
        </section>

)
    ;
}

export default BestProduct;