import React, { useContext, useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import '../styles/ProductCard.css'

function CartButton({ product }) {
    const { client, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams(); // id est une valeur et non un objet
    console.log(id); // Vérifie que l'ID est bien récupéré

    const productId = id;
    console.log(productId)
    // const productQuantity = 1;

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

            await axios.post(`${process.env.REACT_APP_API_URL}/api/products/addCart`, {
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





    return (
        <>
            {successMsg && <div className="success-message">{successMsg}</div>}
            {errorMsg && <div className="error-message">{errorMsg}</div>}
        <button className={'cart--btn'} onClick={handleAdd}>
                        <span>
                        Ajouter au panier
                        </span>
            <img src={'../assets/images/cart-icon--card.svg'}/>

        </button>
        </>
    );
}

export default CartButton;