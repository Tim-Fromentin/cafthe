import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import '../styles/ProductDetail.css'


function ProductDetails(props) {

    const {id} = useParams();
    const [productDetails, setProductDetails] = useState([])

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/product/${id}`);
                console.log(response.data)
                setProductDetails(response.data);
            } catch (error){
                console.error("Erreur de chargement du produit")
            }
        }
        void fetchProductDetail();
    }, [id]);
    return (
        <>
            <section id={'s_product'}>
                <div className={'box--img'}>
                    <img src={'../assets/images/example--product.png'} />
                </div>
                <div className={'box--content'}>
                    <span>{productDetails.product_price} €</span>
                    <h1>
                    {productDetails.product_name}

                    </h1>
                    <p>
                        {productDetails.product_desc}
                    </p>
                </div>
            </section>
        </>
    );
}

export default ProductDetails;