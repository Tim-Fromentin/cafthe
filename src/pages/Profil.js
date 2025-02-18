import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {NavLink, Link} from "react-router-dom";
import '../styles/Profil.css'

function Profil(props) {
    const {client, isAuthenticated, logout} = useContext(AuthContext)

    console.log(client)
    const handleLogout = () => {
        logout();
    }
    return (
        <main>
            <section id={'s_profil'}>
                {isAuthenticated ? (
                    <>
                    <h1>Bonjour {client.prenom}</h1>
                        <ul className={'info--profil'}>
                            <li>Email : {client.email}</li>
                            <li>Adresse : {client.adresse}</li>
                        </ul>
                        <Link to={'/profil/Modif'}>Modifier vos informations personnel ?</Link>
                        <Link to={'/profil/ModifPass'}>Modifier votre mot de passe</Link>
            <button onClick={handleLogout}>logout</button>
                     </>

                ) : (
                    <>
                    <h1>Vous n'etes pas connecter</h1>
                    </>
                )}

            </section>

        </main>
    );
}

export default Profil;