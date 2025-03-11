import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {NavLink, Link} from "react-router-dom";
import '../styles/Profil.css'
import axios from "axios";
import ProductCard from "../components/ProductCard";
import DontConnect from "../components/DontConnect";

function Profil(props) {
    const {client, isAuthenticated, logout} = useContext(AuthContext)

    console.log(client)
    const handleLogout = () => {
        logout();
    }
    const [commands, setCommand] = useState([])

    useEffect(() => {
        const fetchPCommands = async () => {
            if (!client?.id) return; // Vérifier que client.id est défini
            try {
                const response = await axios.post(`http://localhost:3000/api/client/commands`, {
                    client_id: client.id
                });
                setCommand(response.data);
                console.log('Commandes chargées avec succès !', response.data);
            } catch (error) {
                console.error("Erreur de chargement des commandes", error);
            }
        };

        fetchPCommands();
    }, [client]);

    return (
        <>
            <section id={'s_profil'}>
                {isAuthenticated ? (
                    <>

                        <h1 className={'title--profil'}>Bonjour {client.prenom}</h1>
                        <div id={'container--info_profil'}>

                            <div className={'info'}>
                                <h4>Informations</h4>
                                <h3>{client.prenom} {client.nom}</h3>
                                <p>{client.adresse}</p>
                                <p>{client.email}</p>
                                <div className={'profil--link'}>
                                    <Link to={'/profil/Modif'}>Éditer votre compte</Link>
                                    <Link to={'/profil/ModifPass'}>Éditer votre mot de passe</Link>
                                    <Link to={'/profil/DeleteAccount'}>Supprimer votre compte</Link>
                                    <button onClick={handleLogout} className={'link--primary'}>Deconnexion</button>
                                </div>

                            </div>
                            <a href={'#'} className={'info--ads'}>

                            <img src={'./assets/images/banner--ads-2.jpg'}/>
                            </a>

                        </div>


                        <div id={'container--command_profil'}>
                        <h3>Historique des commandes</h3>

                            <table className={'list--product'}>
                                <thead>
                                <tr>
                                    <th>Numero de commande</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Statut</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th>#1</th>
                                    <td>8 Sep, 2023</td>
                                    <td>42.00€ (3 Products)</td>
                                    <td>
                                        <span>

                                        En cours
                                        </span>
                                        <a>Voir détails</a>

                                    </td>
                                </tr>
                                {commands.map((command) => <tr>


                                        <th key={command.command_id}>#{command.command_id}</th>
                                        <td>8 Sep, 2023</td>
                                        <td>{command.command_total}€ (3 Products)</td>


                                    </tr>
                                )}
                                </tbody>
                            </table>

                        </div>


                    </>

                ) : (
                    <>
                        <DontConnect />
                    </>
                )}

            </section>

        </>
    );
}

export default Profil;