import React from 'react';
import {Link} from "react-router-dom";
import '../styles/DontConnect.css';
import BestProduct from "./BestProduct";

function DontConnect(props) {
    return (
        <>
        <section id={'s_notConnect'}>
            <h1>Vous n'étes pas connectez</h1>
            <hr />
            <h2>Un probléme technique ? Contactez le <Link to={'/contact'} >support</Link> </h2>
            <Link to={'/login'} className={'link--secondary'}>Connectez-vous</Link>
        </section>
            <BestProduct />
        </>
    );
}

export default DontConnect;