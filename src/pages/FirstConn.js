import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function FirstConn(props) {
    const {login} = useContext(AuthContext) // function login venant du contexte
    const navigate = useNavigate()
    const [client_email, setClient_email] = useState('')
    const [client_password, setClient_password] = useState('')
    const [errorMsg, setErrorMsg] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        try {

            console.log("Données envoyées à l'API :", { client_email: client_email, client_password: client_password  });

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/client_first_conn/`, {
                client_email: client_email, NewPass: client_password
            });
            navigate("/Login")

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
            <section id={'s_login'}>

                <form onSubmit={handleSubmit}>
                    <h1>Premiere connexion</h1>
                    <label htmlFor={'email'}>Votre email</label>
                    <input
                        type={'email'}
                        id={'email'}
                        value={client_email}
                        onChange={(e) => {
                            setClient_email(e.target.value)
                        }}/>

                    <label htmlFor={'password'}>Mot de passe</label>
                    <input type={'password'} id={'password'} value={client_password}
                           onChange={(e) => {
                               setClient_password(e.target.value)
                           }}
                    />

                    {errorMsg && (
                        <p>{errorMsg}</p>
                    )}

                    <button type={'submit'} className={'link--primary'}>
                        Créer son mot de passe
                    </button>
                    <NavLink to={'/register'}>
                        Pas encore de compte ?
                    </NavLink>
                </form>

                <div className={'log--banner'}>
                    <h2 className={'form--title'}>CAF'THE</h2>
                    <img src={'./assets/images/coffee--bean.png'}/>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.</p>
                </div>
            </section>
        </main>
    );
}

export default FirstConn;