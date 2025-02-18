import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Register(props) {
    const {login} = useContext(AuthContext) // function login venant du contexte
    const navigate = useNavigate()
    const [client_email, setClient_email] = useState('')
    const [client_password, setClient_password] = useState('')
    const [client_firstName, setClient_firstName] = useState('')
    const [client_lastName, setClient_lastName] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit= async (e) => {
        e.preventDefault()
        setErrorMsg('')

        try {
            const response = await axios.post("http://localhost:3000/api/clients/register", {
                client_firstName,
                client_lastName,
                client_email,
                client_password
            })
            const { token, client } = response.data

            //     on met a jour le contexte d'authendification
            login(token, client)

            //     Redirection d'un client vers une page
            navigate("/Login")
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
                    <h1>Se creer un compte</h1>

                    <label htmlFor={'client_firstName'}>Votre prenom</label>
                    <input
                        type={'text'}
                        id={'client_firstName'}
                        value={client_firstName}
                        onChange={(e) => {
                            setClient_firstName(e.target.value)
                        }}/>

                    <label htmlFor={'client_lastName'}>Votre nom</label>
                    <input
                        type={'text'}
                        id={'client_lastName'}
                        value={client_lastName}
                        onChange={(e) => {
                            setClient_lastName(e.target.value)
                        }}/>


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
                        Se connecter
                    </button>
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

export default Register;