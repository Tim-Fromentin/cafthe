import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import '../styles/notFound.css'
function NotFound(props) {
    return (
        <section id={'s_notFound_error'}>
            <h1>Erreur 404</h1>
            <span>Une erreur est survenue. Si vous pensez avoir trouvé un bug, merci de contacter <a
                href={'#'}>l'administrateur</a>.</span>
            <NavLink to="/">

                <p className={'link_effect-404'}>Retourner a l'Accueil</p>
            </NavLink>
        </section>
    );
}

export default NotFound;