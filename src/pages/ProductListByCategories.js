import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {useParams} from "react-router-dom";

function ProductListByCategories(props) {



    const {id} = useParams();
    const [productDetails, setProductDetails] = useState([])

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
                console.log(response.data)
                setProductDetails(response.data);
            } catch (error){
                console.error("Erreur de chargement du produit")
            }
        }
        void fetchProductDetail();
    }, [id]);


    return (
        <></>
    );
}

export default ProductListByCategories;