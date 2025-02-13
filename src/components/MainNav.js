import {AuthContext} from "../context/AuthContext";
import {Link, NavLink} from "react-router-dom";
import React, {useContext} from 'react';
import ('../styles/global.css')
import ('../styles/MainNav.css')

const MainNav = () => {
    const {client, isAuthenticated, logout} = useContext(AuthContext)
    console.log(client)
    const handleLogout = () => {
        logout();
    }
    return (
        <nav id={'mainNav'}>
            <ul className={'mn_links'}>
                <li className={''}>
                    <a href={'#'}>
                        <img className={'logo'} src={'./assets/images/coffee--bean.png'} />
                    </a>
                </li>


                <NavLink to="/"
                         className={(nav) =>
                             (nav.isActive ? "mn_link--active mn_link" : "mn_link")
                         }>

                    <li className={''}>Accueil</li>
                </NavLink>


                <NavLink to="/products"
                         className={(nav) =>
                             (nav.isActive ? "mn_link--active mn_link" : "mn_link")
                         }>

                    <li className={''}>Boutique</li>
                </NavLink>



                <NavLink to="/Contact"
                         className={(nav) =>
                             (nav.isActive ? "mn_link--active mn_link" : "mn_link")
                         }>

                    <li className={''}>Contact</li>
                </NavLink>
            </ul>
            <ul className={'mn_buttons'}>
                <li className={'mn_button'}><a href={'#'}>
                    <img src={'./assets/images/cart--icon.png'} />
                </a></li>
                <NavLink to="/Login" className={(footer) => (footer.isActive ? "mn_button" : "mn_button")}>

                    {/*<img src={'./assets/images/user--icon.png'} />*/}
                </NavLink>

                <li className={'mn--login'}>
                    {isAuthenticated ? (
                        // <>
                        // {/*<span>Bonjour {client.prenom}</span>*/}
                        // </>
                        <NavLink to={'/profil'}
                                 className={(nav) =>
                                     (nav.isActive ? "mn_button--log mn_button--log--active" : "mn_button--log")}
                        >
                            <img src={'./assets/images/user--icon.png'}/>

                            <span>Voir le profil
                            </span>
                        {/*<button onClick={handleLogout}>logout</button>*/}
                        </NavLink>
                    ) : (
                        <NavLink to={'/login'}
                              className={(nav) =>
                                  (nav.isActive ? "mn_button--log mn_button--log--active" : "mn_button--log")}
                        >
                            <img src={'./assets/images/user--icon.png'}/>

                            <span>Se connecter</span>
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default MainNav;