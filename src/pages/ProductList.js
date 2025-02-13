import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "react-loading-skeleton/dist/skeleton.css"
import Skeleton from "react-loading-skeleton";
import '../styles/productList.css'

function ProductList(props) {
    const [products, setProducts] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/products");
                console.log(response.data)
                setProducts(response.data);
            } catch (error){
                console.error("Erreur de chargement des produits")
            }
            // finally {
            //     setIsLoading(false)
            // }
        }
        void fetchProducts();
    }, []);


    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        if (checked){
            console.log('f')
        }
        // console.log("Checkbox checked:", event.target.checked);
        console.log(isChecked)
    };
    // if (isLoading){
    //     return (
    //         <div>
    //             {Array.from({length: 6}).map((_,i) => (
    //                 <div key={1}>
    //                     <Skeleton height={200} width={300} />
    //
    //                     <div>
    //                         <Skeleton height={20} width="70%"/>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }
    return (
        <section id={'s_product--list'}>
            <div className={'filter--opt'}>
                <button>Filtrer</button>
                <div>
                <span>Filtrer par</span>
                    <select>
                        <option value={'price_asc'}>Prix croissant</option>
                        <option value={'price_dsc'}>Prix decroissant</option>
                        <option value={'new'}>Nouveaute</option>
                    </select>
                </div>
                <span>{products.length} Produits trouver</span>

            </div>

            <div className={'product--list'}>
                <nav className={'product_filter--list'}>
                    <ul>
                        <li className={'filter--item'}>
                            <h6>Choix du pays de production</h6>
                        </li>
                        {[...new Set(products.map((product) => product.product_country))].map((country) => (
                            // <div key={country}>{country}</div>


                            <li className={'filter--item'}>
                        <input
                            type="checkbox"
                            id={country}
                            key={country}
                           checked={isChecked}
                           onChange={handleCheck}
                        />
                        <label htmlFor={country}>{country}</label>
                    </li>
                    ))}

                    </ul>
                </nav>
                <div className={'products'}>

                    {products.map((product) => <ProductCard key={product.product_serial_number} product={product}/>)}
                </div>

            </div>
        </section>
    );
}

export default ProductList;