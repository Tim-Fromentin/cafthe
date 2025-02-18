import React, {use, useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "react-loading-skeleton/dist/skeleton.css"
import Skeleton from "react-loading-skeleton";
import '../styles/productList.css'

function ProductList(props) {
    const [products, setProducts] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('');

    const handleChange = (event) => {
        const valueOpt = event.target.value;
        setFilter(valueOpt);
        console.log(valueOpt)
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (!filter) setFilter('asc');
            try {
                const response = await axios.get(`http://localhost:3000/api/products?filter=${filter}`);
                setProducts(response.data);
            } catch (error){
                console.error("Erreur de chargement des produits")
            }

        }
        void fetchProducts();
    }, [filter]);


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
                <div>
                <span>Filtrer par</span>
                    <select className={'filter--select'} onChange={handleChange}>
                        <option value={'asc'}>Prix croissant</option>
                        <option value={'desc'}>Prix decroissant</option>
                    </select>
                </div>
                <span>{products.length} Produits trouver</span>

            </div>

            <div className={'product--list'}>
                {/*<nav className={'product_filter--list'}>*/}
                {/*    <ul>*/}
                {/*        <li className={'filter--item'}>*/}
                {/*            <h6>Choix du pays de production</h6>*/}
                {/*        </li>*/}
                {/*        {[...new Set(products.map((product) => product.product_country))].map((country) => (*/}
                {/*            // <div key={country}>{country}</div>*/}


                {/*            <li className={'filter--item'}>*/}
                {/*                <input*/}
                {/*                    type="radio"*/}
                {/*                    id={country}*/}
                {/*                    key={country}*/}
                {/*                    checked={isChecked}*/}
                {/*                    onChange={handleCheck}*/}
                {/*                />*/}
                {/*                <label htmlFor={country}>{country}</label>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*        /!*<li className={'filter--item'}>*!/*/}
                {/*        /!*    <input key={'price_min'} type={"number"}/>*!/*/}
                {/*        /!*    <input key={'price_max'} type={"number"}/>*!/*/}
                {/*        /!*</li>*!/*/}

                {/*    </ul>*/}
                {/*</nav>*/}
                <div className={'products'}>

                    {products.map((product) => <ProductCard key={product.product_serial_number} product={product}/>)}
                </div>

            </div>
        </section>
    );
}

export default ProductList;