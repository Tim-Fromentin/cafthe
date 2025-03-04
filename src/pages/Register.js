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
    const [client_born_date, setClient_born_date] = useState('')
    const [client_adress, setClient_adress] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit= async (e) => {
        e.preventDefault()
        setErrorMsg('')

        try {
            const response = await axios.post("http://localhost:3000/api/clients/register", {
                client_firstName,
                client_lastName,
                client_email,
                client_born_date,
                client_adress,
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
            <section id={'s_register'}>

                <form onSubmit={handleSubmit}>
                    <h1>Se creer un compte</h1>
                    <div className={'form--container'}>
                        <label htmlFor={'client_firstName'}>Votre prenom</label>
                        <input
                            type={'text'}
                            id={'client_firstName'}
                            required
                            value={client_firstName}
                            onChange={(e) => {
                                setClient_firstName(e.target.value)
                            }}/>

                        <label htmlFor={'client_lastName'}>Votre nom</label>
                        <input
                            type={'text'}
                            id={'client_lastName'}
                            required
                            value={client_lastName}
                            onChange={(e) => {
                                setClient_lastName(e.target.value)
                            }}/>


                        <label htmlFor={'email'}>Votre email</label>
                        <input
                            type={'email'}
                            id={'email'}
                            value={client_email}
                            required
                            onChange={(e) => {
                                setClient_email(e.target.value)
                            }}/>

                        <label htmlFor={'born_date'}>Votre date de naissance</label>
                        <input
                            type={'date'}
                            id={'born_date'}
                            value={client_born_date}
                            onChange={(e) => {
                                setClient_born_date(e.target.value)
                            }}/>
                        <label htmlFor={'adress'}>Votre adresse</label>
                        <input
                            type={'text'}
                            id={'adress'}
                            value={client_adress}
                            onChange={(e) => {
                                setClient_adress(e.target.value)
                            }}/>

                        <label htmlFor={'password'}>Mot de passe</label>

                        <input type={'password'} id={'password'} value={client_password}
                               required
                               onChange={(e) => {
                                   setClient_password(e.target.value)
                               }}
                        />

                        {errorMsg && (
                            <p>{errorMsg}</p>
                        )}

                        <button type={'submit'} className={'link--primary log--btn'}>
                            Se créer un compte
                        </button>
                    </div>

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