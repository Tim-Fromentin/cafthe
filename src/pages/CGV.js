import React from 'react';

function Cgv(props) {
    return (
        <section>
            <h1>Conditions Générales de Vente (CGV)</h1>

            <h2>1. Présentation de l’entreprise</h2>
            <p><strong>Dénomination sociale :</strong> Caf'Thé</p>
            <p><strong>Siège social :</strong> 12 Rue des Arômes, 41000 Blois, France</p>
            <p><strong>SIRET :</strong> 123 456 789 00012</p>
            <p><strong>RCS :</strong> Blois</p>
            <p><strong>TVA intracommunautaire :</strong> FR12 123456789</p>
            <p><strong>Email :</strong> contact@caf-the.fr</p>
            <p><strong>Téléphone :</strong> +33 2 54 00 00 00</p>
            <p><strong>Directeur de publication :</strong> Jean Dupont</p>

            <h2>2. Objet</h2>
            <p>Les présentes Conditions Générales de Vente (CGV) définissent les modalités de vente des produits
                proposés par Caf'Thé sur son site internet <a href="#">www.caf-the.fr</a>.</p>

            <h2>3. Produits et services</h2>
            <ul>
                <li>Du café en grains et moulu</li>
                <li>Du thé en vrac et en sachets</li>
                <li>Des accessoires (moulins, tasses, théières, etc.)</li>
            </ul>

            <h2>4. Prix et paiement</h2>
            <p>Les prix sont indiqués en euros (€), toutes taxes comprises (TTC). Caf'Thé se réserve le droit de
                modifier ses prix à tout moment.</p>
            <p><strong>Paiements acceptés :</strong></p>
            <ul>
                <li>Carte bancaire (Visa, Mastercard)</li>
                <li>PayPal</li>
                <li>Virement bancaire</li>
            </ul>

            <h2>5. Commande et validation</h2>
            <p>Toute commande passée sur le site constitue une acceptation des CGV. Un email de confirmation est envoyé
                après validation du paiement.</p>

            <h2>6. Livraison</h2>
            <ul>
                <li>Livraison en France métropolitaine sous 3 à 5 jours ouvrés.</li>
                <li>Frais de livraison calculés lors du passage en caisse.</li>
                <li>Caf'Thé ne saurait être tenu responsable des retards dus au transporteur.</li>
            </ul>

            <h2>7. Droit de rétractation</h2>
            <p>Conformément à l’article L.221-18 du Code de la consommation, l’acheteur dispose d’un délai de 14 jours
                pour retourner un produit non ouvert et obtenir un remboursement.</p>

            <h2>8. Garantie et réclamations</h2>
            <p>Les produits sont garantis contre les défauts de fabrication. En cas de problème, l’acheteur peut
                contacter Caf'Thé à <a href="mailto:contact@caf-the.fr">contact@caf-the.fr</a>.</p>

            <h2>9. Responsabilité</h2>
            <p>Caf'Thé ne saurait être tenu responsable en cas d’indisponibilité temporaire du site, de force majeure ou
                d’erreur manifeste sur un prix affiché.</p>

            <h2>10. Protection des données personnelles</h2>
            <p>Les données collectées sont traitées conformément au RGPD. L’acheteur peut demander la suppression de ses
                données à tout moment.</p>

            <h2>11. Litiges et droit applicable</h2>
            <p>Les présentes CGV sont soumises au droit français. Tout litige sera du ressort des tribunaux de
                Blois.</p>

        </section>
    );
}

export default Cgv;