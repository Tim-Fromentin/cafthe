import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import '../styles/ProductCard.css';

function ProductCard({ product }) {
    const { client, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const productId = product.product_serial_number;
    const productQuantity = product.product_quantity;

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    useEffect(() => {
        if (successMsg || errorMsg) {
            const timeOut = setTimeout(() => {
                setSuccessMsg('');
                setErrorMsg('');
            }, 3000);
            return () => clearTimeout(timeOut);
        }
    }, [successMsg, errorMsg]);

    const handleAdd = async () => {
        setErrorMsg('');
        setSuccessMsg('');

        if (!isAuthenticated) {
            setErrorMsg('Veuillez vous connecter pour ajouter un produit au panier.');
            return;
        }

        try {
            const clientId = client.id;
            setSuccessMsg('Produit ajouté au panier !');

            await axios.post("http://localhost:3000/api/products/addCart", {
                product_serial_number: productId,
                client_id: clientId,
            });

        } catch (error) {
            console.error('Erreur lors de l\'ajout au panier :', error);
            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Une erreur est survenue. Veuillez réessayer.');
            }
        }
    };
    let image = product.product_img || "coffee.png";
    const productImage = `./assets/images/products/${image}`;




    return (
        <div id="product_card">
            {successMsg && <div className="success-message">{successMsg}</div>}
            {errorMsg && <div className="error-message">{errorMsg}</div>}

            {/* Image */}
            <img className={'product_image'} src={productImage} alt={product.product_name + " image"} />
            <h3>{product.product_name}</h3>
            <p>{product.product_price} $ TTC</p>
            <p>{product.product_categorie_name}</p>
            <Link to={`/product/${product.product_serial_number}`} className={'see_details'}>Voir détails</Link>
            <button onClick={handleAdd} className={'add_cart'}>
                <img src={'./assets/images/cart-icon--card.svg'}/>
            </button>
        </div>
    );
}

export default ProductCard;
