import React from 'react';
import ('../styles/global.css')
import ('../styles/MainNav.css')

const MainNav = () => {
    return (
        <nav id={'mainNav'}>
            <ul className={'mn_links'}>
                <li className={'mn_link'}>
                    <a href={'#'}>Acceuil</a>
                </li>

                <li className={'mn_link'}>
                    <a href={'#'}>Produits</a>
                </li>

                <li className={'mn_link'}>
                    <a href={'#'}>OTHER</a>
                </li>
                <li className={'mn_link'}>
                    <a href={'#'}>OTHER</a>
                </li>
                <li className={'mn_link'}>
                    <a href={'#'}>OTHER</a>
                </li>
            </ul>
        </nav>
    );
};

export default MainNav;