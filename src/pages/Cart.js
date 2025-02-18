import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {AuthContext} from "../context/AuthContext";
import '../styles/Cart.css'
import {NavLink} from "react-router-dom";

function Cart(props) {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])


    const { client, isAuthenticated } = useContext(AuthContext);

    console.log("Client dans Cart.js :", client);
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (!client || !client.id) {
            console.warn("Client non défini, on ne charge pas le panier");
            return;
        }

        const fetchProducts = async () => {
            try {
                console.log("Fetching products for client ID:", client.id);
                const response = await axios.post("http://localhost:3000/api/client/cart", {
                    client_id: client.id
                });

                console.log("Produits reçus:", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error("Erreur de chargement du panier", error);
            }
        };

        fetchProducts();
    }, [client]);


    const productId = products.product_serial_number

    const [errorMsg, setErrorMsg] = useState('')

    const handleAdd = async (productSerialNumber) => {
        setErrorMsg('')
        try {
            const clientId = client.id;

            console.log("Données envoyées à l'API :", { product_serial_number: productSerialNumber, client_id: clientId });

            const response = await axios.post("http://localhost:3000/api/client/cart/updateQuantityMore", {
                product_serial_number: productSerialNumber,
                client_id: clientId,
            });
            console.log("Réponse du serveur :", response);
            window.location.reload()
        } catch (error) {
            console.error("Erreur lors de l'ajout dans le panier : ", error);

            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Erreur');
            }
        }
    };


       const handleRemove = async (productSerialNumber) => {
        setErrorMsg('')
        try {
            // if ()
            const clientId = client.id;

            console.log("Données envoyées à l'API :", { product_serial_number: productSerialNumber, client_id: clientId });

            const response = await axios.post("http://localhost:3000/api/client/cart/updateQuantityLess", {
                product_serial_number: productSerialNumber,
                client_id: clientId,
            });
            // console.log(product.command_quantity)

            window.location.reload()
            console.log("Réponse du  serveur :", response);
        } catch (error) {
            console.error("Erreur lors de l'ajout dans le panier : ", error);

            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Erreur');
            }
        }
    };




    const commandLineId = products.command_line_quantity

    const handleDelete = async (commandLineId) => {
        setErrorMsg('')
        try {
            const clientId = client.id;

            console.log("Données envoyées à l'API :", { command_line_id: commandLineId, client_id: clientId });


            const response = await axios.delete("http://localhost:3000/api/client/cart/deleteLine", {
                data: {

                command_line_id : commandLineId,
                client_id: clientId,
                }
            });

            console.log("Réponse du serveur :", response);
            window.location.reload()
        } catch (error) {
            console.log(commandLineId)
            console.error("Erreur lors de la suppression de la ligne panier : ", error);

            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Erreur');
            }
        }
    };





    return (
        <main>
            <section id={'s_cart'}>
                <h1 className={"surtitle--b"}>Votre panier</h1>
                <div className={'cart--list'}>
                    <table className={'cart--product_table'}>
                        <thead>
                        <tr>
                            <th>Produits</th>
                            <th>Quantite</th>
                            <th>Prix</th>
                        </tr>
                        </thead>
                        <tbody>
                {products.map((product) =>

                    <tr key={product.product_serial_number}>
                        <th>

                            {product.product_name}
                        </th>
                        <td className={'col--quantity'}>
                            <div className={'choice_quantity'}>
                                <button onClick={() => handleRemove(product.product_serial_number)}>-</button>
                                {product.command_quantity}
                                <button onClick={() => handleAdd(product.product_serial_number)}>+</button>
                            </div>
                            <button onClick={() => handleDelete(product.command_line_id)} className={'cart_btn--delete'}>
                                <img src={'./assets/images/trash--icon.png'} />
                                <span>Supprimer</span>
                            </button>
                        </td>
                        <td>{product.command_total_price}€</td>

                    </tr>
                )}
                        </tbody>
                        <tfoot>
                        <tr>
                            <th>/</th>
                            <td>/</td>
                            <td>Total : </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <NavLink to={'/command'}>
            Passez commande
        </NavLink>
            </section>
        </main>
    );
}

export default Cart;