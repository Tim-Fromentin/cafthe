import React from 'react';
import '../styles/contact.css'

function Contact(props) {
    return (
        <main>

        <section id={'s_contact'} className={'s_blue'}>

        <img src={'../assets/images/map--example.png'} alt={'test'}/>
            <div className={'sc_box_contact'}>
            <div className={'phone_num'}>

                <div className={'phone--icon'}>
                <img src={'../assets/images/phone--icon.png'} />
                </div>
                <div>
                <h4>Numero de telehpone</h4>
                <a>0650000000</a>
                </div>

            </div>
                <a className={'link--primary'} href={'#'}>Nous appeller</a>
            </div>

            <div className={'sc_contact_list'}>
                <h1>Nous contacter</h1>
                <ul className={'list_contact'}>
                    <li className={'list_item'}>
                        <a href={'#'}>3 rue du charles de Gaule</a>
                    </li>                    <li className={'list_item'}>
                        <a href={'#'}>3 rue du charles de Gaule</a>
                    </li>                    <li className={'list_item'}>
                        <a href={'#'}>3 rue du charles de Gaule</a>
                    </li>                    <li className={'list_item'}>
                        <a href={'#'}>3 rue du charles de Gaule</a>
                    </li>
                </ul>
            </div>
        </section>

        </main>
    );
}

export default Contact;