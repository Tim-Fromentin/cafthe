import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "react-loading-skeleton/dist/skeleton.css"
import Skeleton from "react-loading-skeleton";

function ProductList(props) {
    const [products, setProducts] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/products");
                console.log(response.data)
                setProducts(response.data);
            } catch (error){
                console.error("Erreur de chargement des produits")
            }
            // finally {
            //     setIsLoading(false)
            // }
        }
        void fetchProducts();
    }, []);

    // if (isLoading){
    //     return (
    //         <div>
    //             {Array.from({length: 6}).map((_,i) => (
    //                 <div key={1}>
    //                     <Skeleton height={200} width={300} />
    //
    //                     <div>
    //                         <Skeleton height={20} width="70%"/>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }
    return (
        <div>
            <h1>Product List</h1>
            <div>
                {products.map((product) => <ProductCard key={product.product_serial_number} product={product}/>)}

            </div>
        </div>
    );
}

export default ProductList;