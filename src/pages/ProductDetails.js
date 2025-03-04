import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import '../styles/ProductDetail.css'
import CartButton from "../components/CartButton";


function ProductDetails(props) {


    const {id} = useParams();
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/product/${id}`);
                console.log(response.data)
                setProduct(response.data);
            } catch (error){
                console.error("Erreur de chargement du produit")
            }
        }
        void fetchProductDetail();
    }, [id]);

    let image = product.product_img || "coffee.png";
    const productImage = `../assets/images/products/${image}`;
    return (
        <>
            <section id={'s_product'}>
                <div className={'box--img'}>
                    <img src={productImage} />
                </div>
                <div className={'box--content'}>
                    <span className={'pd_price'}>{product.product_price} €</span>
                    <h1 className={'pd_name'}>
                        {product.product_name}

                    </h1>
                    <hr />
                    <p>
                        {product.product_desc}
                    </p>
                    <p>
                        Pays d'origine : {product.product_country}
                    </p>
                    <p>
                        Poids : {product.product_weight}
                    </p>
                    <p>
                        Catégorie : {product.product_categorie_name}
                    </p>

            <CartButton />
                </div>
            </section>
        </>
    );
}

export default ProductDetails;