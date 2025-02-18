import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import '../styles/ProductCard.css'

function ProductCard({product}) {


    const {client, isAuthenticated} = useContext(AuthContext)
    // console.log(client)
    const productId = product.product_serial_number
    const productQuantity = product.product_quantity



    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [succesMsg, setSucessMsg] = useState('')

    const handleAdd = async (e) => {
        setErrorMsg('')
        setSucessMsg('')

        try {
    const clientId = client.id
                setSucessMsg('Produit mis dans le panier')
            const response = await axios.post("http://localhost:3000/api/products/addCart", {
                product_serial_number: productId,
                client_id: clientId,
            })
        } catch (error) {
            console.error('Erreur lors de l\'ajout dans le panier : ', error);
            setErrorMsg('Pour ajouter un produit dans le panier veuillez vous connectez')

            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message)
            } else {
                setErrorMsg('Erreur')
            }
        }
    }

    return (
        <div id={'product_card'}>
            {succesMsg && <div className="success-message">{succesMsg}</div>}
            {errorMsg && <div className="success-message">{errorMsg}</div>}
        {/*image*/}
            <img src={'./assets/images/example--product.png'} />
            <h3>{product.product_name}</h3>
            <p>{product.product_price} $ TTC</p>
            <Link to={`/product/${product.product_serial_number}`} >Voir details</Link>
            <button onClick={handleAdd}>Panier</button>
        </div>
    );
}

export default ProductCard;