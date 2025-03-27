import React, {useContext, useState, useEffect, use} from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Profil() {
    const { client, isAuthenticated } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState("");



    useEffect((e) => {
        console.log("Nouvel mot passe :", newPassword);
    }, [newPassword]);


    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        try {
            const clientId = client.id;

            console.log("Données envoyées à l'API :", { NewPass: newPassword, client_id: clientId });

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/client_modif_pass/`, {
                NewPass: newPassword,
                client_id: clientId,
            });

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
            <section>
                {isAuthenticated ? (
                    <>
                        <span>Bonjour {client?.prenom}</span>
                        <form onClick={handleSubmit}>
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type={'password'}
                                id="password"
                                value={newPassword}
                                placeholder={'MotDePasse'}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />


                            <button type={"submit"}>Valider les changement</button>
                        </form>

                    </>
                ) : (
                    <h1>Vous n'êtes pas connecté</h1>
                )}
            </section>
        </main>
    );
}

export default Profil;
