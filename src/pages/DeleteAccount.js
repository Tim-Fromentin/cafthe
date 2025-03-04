import React, {useContext, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function DeleteAccount(props) {
    const {client, isAuthenticated, logout} = useContext(AuthContext)

    console.log(client)
    const handleLogout = () => {
        logout();
    }
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        try {
            const clientId = client.id;

            console.log("Données envoyées à l'API :", {client_id: clientId });

            const response = await axios.put("http://localhost:3000/api/client_del/", {
                client_id: clientId,
            });
            logout();

            console.log("Réponse du serveur :", response);
            window.location.reload()
        } catch (error) {
            console.error("Erreur lors dela  modif d'email : ", error);

            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Erreur');
            }
        }
    }
    return (
        <section>
            {isAuthenticated ? (
                <>
                    <h1>Suppression de compte</h1>
                    <form onSubmit={handleSubmit}>
                        <h3>Etes vous certains de vouloir supprimer votre compte ?</h3>
                        <label htmlFor={'read'}>Oui, j'ai lu et compris les Conditions Générales d'Utilisation</label>
                        <input type={'checkbox'} id={'read'} required/>
                        <button type={'submit'}>Supprimer</button>
                    </form>
                </>
            ) : (
                <>
                    <h1>Vous n'êtes pas connecté</h1>
                </>
            )}
        </section>
    );
}

export default DeleteAccount;