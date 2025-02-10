import React from 'react';
import ProductList from "./ProductList";

import ('../styles/global.css')
import ('../styles/HomePage.css')

const HomePage = () => {

    function handleCategorie(e){
        const key = e.target.dataset.key
        console.log(key)

    }
    return (

    <main>

        <section id={'homepage'}>
    <div className={"hp_box_txt"}>
        <h1 className={'title'}>
            Caf'the le meilleur du cafe
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.</p>
    </div>

            <div className={'hp_list_label'}>
                <ul className={"list_label"}>
                    <li>
                        <img src={"./assets/images/bio--icon.png"} />
                    </li>                    <li>
                        <img src={"./assets/images/bio--icon.png"} />
                    </li>                    <li>
                        <img src={"./assets/images/bio--icon.png"} />
                    </li>
                </ul>
                <img className={"hp_img"} src={"./assets/images/coffe-homepage.png"} />
            </div>
        </section>

        <section id={"s_h_product_list"}>
            <h2>Nos produits phares</h2>
            <p className={"text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </p>
            <div className={"container_product_list"}>
                <div className={"tab"}>
                    <button className={"tab--item"}>Nouveaux</button>
                    <button className={"tab--item"} onClick={handleCategorie} data-key={1}>Nouveaux</button>
                    <button className={"tab--item"} onClick={handleCategorie} data-key={2}>Nouveaux</button>
                </div>
            </div>
        </section>

        <section id={"s_history"}>
            <div className={"sh_container"}>
                <h3 className={"surtitle--w"}>Histoire</h3>
                <p className={"text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et </p>
            </div>
            <div className={"test"}>
            <video src="./assets/videos/coffee-homepage.mp4" autoPlay muted loop/>

            </div>
        </section>

        <section id={'s_merit'}>
            <h3 className={"surtitle--b"}>Nos valeurs</h3>
            <p className={"text"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            </p>
        </section>
    </main>


        // <div>
        //     <ProductList />
        // </div>

    );
};

export default HomePage;