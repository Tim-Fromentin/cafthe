import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import ('../styles/MainFooter.css')

const MainFooter = () => {
    return (
        <footer id={'main_footer'}>
        <ul className={'c_1'}>
            <li className={'r_1 title--footer'}>
                <img className={'logo'} src={'../assets/images/coffee--bean.png'}/>
            <h3>CAF'THE</h3>
            </li>
            <li className={'r_2'}>
            <p>Our vision is to provide convenience and help increase your sales business.</p>
            </li>
            <li className={'r_3'}>

                <div className={'list-icon'}></div>
            </li>
        </ul>

            <ul className={'c_2'}>
                <li className={'r_1'}>
                    Plan du site
                </li>
                <li className={'r_2'}>
                    <NavLink to="/">
                        Acceuil
                    </NavLink>
                </li>
                <li className={'r_3'}>
                    <NavLink to="/products">
                        Boutique
                    </NavLink>
                </li>
                <li className={'r_4'}>
                    <NavLink to="/contact">
                        Contact
                    </NavLink>
                </li>
                <li className={'r_5'}>
                    <NavLink to="/Conditions-generales-d'utilisation">
                        Conditions Générales d'Utilisation
                    </NavLink>
                </li>
                <li className={'r_5'}>
                    <NavLink to="/Conditions-generales-de-vente">
                        Conditions Générales d'Utilisation
                    </NavLink>
                </li>

            </ul>
            <ul className={'c_3'}>
                <li className={'r_1'}>
                    Nos produits
                </li>
                <li className={'r_2'}>
                    <NavLink to="/ProductListByCategorie/2">
                        Cafés
                    </NavLink>
                </li>
                <li className={'r_3'}>
                    <NavLink to="/ProductListByCategorie/1">
                        Thés
                    </NavLink>
                </li>
                <li className={'r_4'}>
                    <NavLink to="/ProductListByCategorie/3">
                        Accessoires
                    </NavLink>
                </li>
                <li className={'r_5'}>
                    <NavLink to="/ProductListByCategorie/4">
                        Tisanes
                    </NavLink>
                </li>
                <li className={'r_6'}>
                    <NavLink to="/ProductListByCategorie/5">
                        Équipements
                    </NavLink>
                </li>
            </ul>
        </footer>
    );
};

export default MainFooter;