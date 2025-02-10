import React from 'react';
import ProductList from "./ProductList";

import ('../styles/global.css')
import ('../styles/HomePage.css')

const HomePage = () => {
    return (


    //     <section id={'homepage'}>
    // <div>
    //     <h1 className={'title'}>
    //         Caf'the le meilleur du cafe
    //     </h1>
    //     <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.</p>
    // </div>
    //
    //         <div className={'hp_list_label'}>
    //             <img src={"./assets/images/coffe-homepage.png"} />
    //         </div>
    //     </section>


        <div>
            <ProductList />
        </div>

    );
};

export default HomePage;