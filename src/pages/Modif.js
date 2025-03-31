import React, {useContext, useState, useEffect, use} from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import DontConnect from "../components/DontConnect";
import '../styles/Modif.css';

function Profil() {
    const { client, isAuthenticated } = useContext(AuthContext);
    const [newEmail, setNewEmail] = useState("");
    const [newAdress, setNewAdress] = useState("")

    // Met à jour `newEmail` lorsque `client` est disponible
    useEffect(() => {
        if (client) {
            setNewEmail(client.email);
            setNewAdress(client.adresse)
        }
    }, [client]);

    // Log le nouvel email à chaque changement
    useEffect((e) => {

        console.log("Nouvel email :", newEmail);
        console.log('Nouvel adress :', newAdress)
    }, [newEmail, newAdress]); // Se déclenche uniquement quand `newEmail` change


    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        try {
            const clientId = client.id;

            console.log("Données envoyées à l'API :", { Newemail: newEmail, NewAdress: newAdress, client_id: clientId });

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/client_modif/`, {
                Newemail: newEmail,
                NewAdress: newAdress,
                client_id: clientId,
            });
            // recup les donnes de locastorage, refaire l'objet client mise a jour

            const storedClient = JSON.parse(localStorage.getItem("client"));
            localStorage.setItem('client', JSON.stringify({
                ...storedClient,
                email: newEmail,
                adresse: newAdress
            }));

    window.location.reload();
            console.log("Réponse du serveur :", response);
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
        <main>
                    <>
                {isAuthenticated ? (
            <section id={'sec_modif'}>
                        <form onClick={handleSubmit}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <label htmlFor="adress">Email</label>
                            <input
                                type={'text'}
                                id="adress"
                                value={newAdress}
                                onChange={(e) => setNewAdress(e.target.value)}
                            />
                            <button type={"submit"}>Valider les changement</button>
                        </form>

            </section>
                ) : (
                    <DontConnect />
                )}
                    </>
        </main>
    );
}

export default Profil;
