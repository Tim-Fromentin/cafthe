import React from 'react';
import {Link} from "react-router-dom";

function ProductCard({product}) {

    return (
        <div>
        {/*image*/}
            <h3>{product.product_name}</h3>
            <p>{product.product_price} $ TTC</p>
            <Link to={`/product/${product.product_serial_number}`} >Voir details</Link>
            <button>Panier</button>
        </div>
    );
}

export default ProductCard;