import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";

function Profil(props) {
    const {client, isAuthenticated, logout} = useContext(AuthContext)
    console.log(client)
    const handleLogout = () => {
        logout();
    }
    return (
        <main>
            <section>
                {isAuthenticated ? (
                    <>
                    <span>Bonjour {client.prenom}</span>
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