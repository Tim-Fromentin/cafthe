import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import '../styles/notFound.css'
import BestProduct from "../components/BestProduct";
function NotFound(props) {
    return (
        <>
        <section id={'s_notFound_error'}>
            <h1>Erreur 404</h1>
            <span>Une erreur est survenue. Si vous pensez avoir trouvé un bug, merci de contacter <a
                href={'#'}>l'administrateur</a>.</span>
            <NavLink to="/" className={'link--secondary'}>

                Retourner a l'Accueil
            </NavLink>
        </section>
            <BestProduct />
        </>
    );
}

export default NotFound;