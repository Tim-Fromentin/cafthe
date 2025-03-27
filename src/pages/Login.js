import React, {useContext, useState} from 'react';
import '../styles/login.css'
import  '../styles/global.css'
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {NavLink, useNavigate} from "react-router-dom";

function Login(props) {
    const {login} = useContext(AuthContext) // function login venant du contexte
    const navigate = useNavigate()
    const [client_email, setClient_email] = useState('')
    const [client_password, setClient_password] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [tryConnect, setTryConnect] = useState(0)
    // localStorage.setItem('try', tryConnect)

    const handleSubmit= async (e) => {
        e.preventDefault()
        setErrorMsg('')
        // setTryConnect(tryConnect + 1)
        if (client_email === '' || client_password === '') {
            setErrorMsg("Tout les champs sont requis");
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/clients/login`, {
                client_email,
                client_password
            })
            const { token, client } = response.data

        //     on met a jour le contexte d'authendification
            login(token, client)

        //     Redirection d'un client vers une page
            navigate("/profil")
            // setTryConnect(0)
        } catch (error) {
            console.error('Erreur lors de la connexion : ', error);
            if (error.response.data.message){
                setErrorMsg(error.response.data.message)
            } else {
                setErrorMsg('Erreur')
            }
        }
    }
    return (

        <main>
            <section id={'s_login'}>

                <form onSubmit={handleSubmit}>
                    <h1>Se connecter</h1>
                    <label htmlFor={'email'}>Votre email</label>
                    <input
                        type={'email'}
                        id={'email'}
                        value={client_email}
                        onChange={ (e) => { setClient_email(e.target.value) } } />

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
                        Se connecter
                    </button>
                    <NavLink to={'/register'}>
                        Pas encore de compte ?
                    </NavLink>
                    <NavLink to={'/firstConn'}>
                        Premiére connexion ?
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

export default Login;