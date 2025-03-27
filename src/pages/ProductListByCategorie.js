import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import '../styles/productList.css';
import {Link, useParams} from "react-router-dom";

function ProductListByCategorie() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('asc'); // Initialisation correcte
    const { id } = useParams();

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}?filter=${filter}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Erreur de chargement des produits");
            }
        };
        fetchProducts();
    }, [id, filter]); // Ajout de `id` dans les dépendances pour éviter les bugs

    return (
        <>
            <meta name="description" content="Helmet application"/>
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
                <div className={'categorie_list'}>
                    <Link to={`/products`} className={'link--third'}>Tout</Link>
                    <Link to={`/ProductListByCategorie/2`} className={'link--third'}>
                        Café</Link>
                    <Link to={`/ProductListByCategorie/1`} className={'link--third'}>
                        Thé</Link>
                    <Link to={`/ProductListByCategorie/3`} className={'link--third'}>
                        Accessoires</Link>
                    <Link to={`/ProductListByCategorie/4`} className={'link--third'}>
                        Tisanes</Link>                <Link to={`/ProductListByCategorie/5`} className={'link--third'}>
                    Équipements</Link>
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
        </>
    );
}

export default ProductListByCategorie;
