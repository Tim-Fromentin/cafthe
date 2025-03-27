import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import DontConnect from "../components/DontConnect";
import '../styles/Command.css';

function Command(props) {
    const { client, isAuthenticated, logout } = useContext(AuthContext);
    const { id } = useParams();
    const [command, setCommand] = useState([]);

    useEffect(() => {
        const fetchCommandDetail = async () => {
            if (!client?.id) return;

            try {

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/command/${id}`, {
                    params: { client_id: client.id }
                });

                console.log(response.data);
                setCommand(response.data);
            } catch (error) {
                console.error("Erreur de chargement de la commande", error);
            }
        };

        fetchCommandDetail();

    }, [id, client]);

    return (
        <>
            {isAuthenticated ? (
                command && command.length > 0 ? (
                    <section id={'s_command'}>
                    <div id={'info--command'}>
                        <p>Commande ID: {command[0].command_id}</p>
                        <p>Statut de la commande : {command[0].command_state}</p>
                        <p>Total : {command[0].command_total}$</p>
                    </div>
                    </section>
                ) : (
                    <p>Aucune commande trouvée</p>
                )
            ) : (
                <DontConnect/>
            )}
        </>

    );
}

export default Command;
