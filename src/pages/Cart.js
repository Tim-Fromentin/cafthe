import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {AuthContext} from "../context/AuthContext";
import '../styles/Cart.css'
import {NavLink} from "react-router-dom";
import login from "./Login";

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
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/client/cart`, {
                    client_id: client.id
                });

                console.log("Produits reçus:", response.data);
                console.log(products.command_total_price)
                setProducts(response.data);
            } catch (error) {
                console.error("Erreur de chargement du panier", error);
            }
        };

        fetchProducts();
    }, [client]);


    const productId = products.product_serial_number
    const stock = products.product_stock
    console.log(stock)

    const [errorMsg, setErrorMsg] = useState('')

    const handleAdd = async (productSerialNumber) => {
        setErrorMsg('')

        try {
            const clientId = client.id;

            console.log("Données envoyées à l'API :", { product_serial_number: productSerialNumber, client_id: clientId });

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/client/cart/updateQuantityMore`, {
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

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/client/cart/updateQuantityLess`, {
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


            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/client/cart/deleteLine`, {
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


    console.log(products.command_total_price)

    console.log(products)

    console.log("Client dans Cart.js :", client);
    console.log("Command.css ID :", client?.command_id);



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

    const commandId = products.length > 0 ? products[0].command_id : null;

    // Modification ici: Remplacer "yes/no" par "domicile/magasin"
    const [deliveryType, setDeliveryType] = useState('magasin')
    const STORE_ADDRESS = "14 Rue du Commerce, 41000 Blois";

    function handleDeliveryChoice(element){
        console.log(element.target.value)
        setDeliveryType(element.target.value)

        if (element.target.value === 'domicile'){
            setAdress(client?.adresse || "")
        } else {
            setAdress(STORE_ADDRESS)
        }
    }

    const [adress, setAdress] = useState(STORE_ADDRESS)

    const handlePaid = async (event) => {
        event.preventDefault(); // Empêcher le rechargement de la page

        setErrorMsg('');
        setSuccessMsg('');

        if (!isAuthenticated) {
            setErrorMsg('Veuillez vous connecter pour ajouter un produit au panier.');
            return;
        }

        try {
            const clientId = client.id;
            // Adresse à utiliser selon le choix de livraison
            const addressToUse = deliveryType === 'domicile'
                ? (client?.adresse || document.getElementById('newAdress').value)
                : STORE_ADDRESS;

            // Vérification que l'adresse n'est pas vide
            if (!addressToUse) {
                setErrorMsg('Veuillez spécifier une adresse de livraison.');
                return;
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/client/cart/paid`, {
                command_id: commandId,
                adress: addressToUse
            });

            setSuccessMsg('Panier payé !');

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Erreur lors du paiement :', error);
            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Une erreur est survenue. Veuillez réessayer.');
            }
        }
    };



    return (
        <main>
            <section id={'s_cart'}>
                <h1 className={"surtitle--b"}>Votre panier</h1>
                <div className={'cart--list'}>
                    <table className="cart--product_table">
                        <thead>
                        <tr>
                            <th>Produits</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucun produit dans le panier</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.product_serial_number}>
                                    <th>{product.product_name}</th>
                                    <td className="col--quantity">
                                        <div className="choice_quantity">
                                            <button onClick={() => handleRemove(product.product_serial_number)}>-
                                            </button>
                                            {product.command_quantity}
                                            <button onClick={() => handleAdd(product.product_serial_number)}>+</button>
                                            {product.product_stock} max
                                        </div>
                                        <button onClick={() => handleDelete(product.command_line_id)}
                                                className="cart_btn--delete">
                                            <img src="./assets/images/trash--icon.png" alt="Supprimer"/>
                                            <span>Supprimer</span>
                                        </button>
                                    </td>
                                    <td>{product.command_total_price}€</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                        {products.length > 0 && (
                            <tfoot>
                            <tr>
                                <th>/</th>
                                <td>/</td>
                                <td>
                                    {/*Total : {products.command_total}€*/}
                                    Total : {products.reduce((acc, product) => acc + (parseFloat(product.command_total_price) || 0), 0).toFixed(2)}€
                                </td>

                            </tr>
                            </tfoot>
                        )}
                    </table>


                </div>
                <div>
                    <form onSubmit={(e) => handlePaid(e)}>
                        <h3>
                            Mode de livraison
                        </h3>
                        <label htmlFor="domicile">À domicile</label>
                        <input type="radio" id="domicile" name="choice_delivery" value="domicile" onClick={handleDeliveryChoice}/>

                        <label htmlFor="magasin">En magasin</label>
                        <input type="radio" id="magasin" name="choice_delivery" value="magasin" onClick={handleDeliveryChoice} defaultChecked/>

                        <p>Adresse de livraison :</p>

                        {deliveryType === "domicile" ? (
                            client?.adresse ? (
                                <span>{client.adresse}</span>
                            ) : (
                                <>
                                    <label htmlFor="newAdress">Veuillez saisir votre adresse</label>
                                    <input type="text" id="newAdress" />
                                </>
                            )
                        ) : (
                            <span>{STORE_ADDRESS}</span>
                        )}

                        <button>Payer</button>
                    </form>
                    {errorMsg && <p className="error-message">{errorMsg}</p>}
                    {successMsg && <p className="success-message">{successMsg}</p>}
                </div>

            </section>
        </main>
    );
}

export default Cart;