import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import '../styles/productList.css';
import { useParams } from "react-router-dom";

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
                const response = await axios.get(`http://localhost:3000/api/products/${id}?filter=${filter}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Erreur de chargement des produits");
            }
        };
        fetchProducts();
    }, [id, filter]); // Ajout de `id` dans les dépendances pour éviter les bugs

    return (
        <section id="s_product--list">
            <div className="filter--opt">
                <div>
                    <span>Filtrer par</span>
                    <select className="filter--select" onChange={handleChange} value={filter}>
                        <option value="asc">Prix croissant</option>
                        <option value="desc">Prix décroissant</option>
                    </select>
                </div>
                <span>{products.length} Produits trouvés</span>
            </div>

            <div className="product--list">
                <div className="products">
                    {products.map((product) => (
                        <ProductCard key={product.product_serial_number} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductListByCategorie;
