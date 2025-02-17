const express = require('express')

const db = require('./db')
require("dotenv")
const {verifyToken} = require('./middleware')

const bcrypt = require('bcrypt')
const {hash} = require("bcrypt");
const url = require("node:url");

const router = express.Router()

const jwt = require('jsonwebtoken')
const {sign} = require('jsonwebtoken')
const {json} = require("express");




// route: lister les produits
// GET /api/produits
router.get("/products", (req, res) => {
    console.log("Requête reçue avec req.query :", req.query);
    const { filter } = req.query;
    let sqlQuery = "SELECT * FROM products";

    if (filter === "desc") {
        sqlQuery += " ORDER BY product_price DESC";
    } else if (filter === "asc") {
        sqlQuery += " ORDER BY product_price ASC";
    }

    console.log("Requête SQL exécutée :", sqlQuery);
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ message: "Erreur du serveur" });
        }
        res.json(result);
    });
});


// Produit par prix decroissant

// router.get("/products?filter=desc", (req, res) => {
//     db.query("SELECT * FROM products ORDER BY product_price DESC", (err, result) => {
//         console.log(req.client)
//         if(err){
//             return res.status(500).json({message: "erreur du serveur"})
//         }
//         res.json(result)
//     })
// })






router.get("/product/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // ---- ou - facon d'extructurer + rapide et
    // const {id} = req.params;


    db.query("SELECT * FROM products WHERE products.product_serial_number = ?", [id], (err, result) => {

        if(err){
            return res.status(500).json({message: "erreur du serveur"})
            // console.log(id)
        }
        if(result.length === 0){
            return res.status(404).json({message: "produit non trouver"})
            // console.log(id)
        }
        res.json(result[0]) // retournera uniquement le 1er resultat

    })
})















// route inscription d'un client
// POST /api/clients/register
// exemple
// {
//     "nom": "Jean",
//     "prenom": "Du",
//     "email": "test@test.fr",
//     "mp": "password"
// }

router.post("/clients/register", (req,res) => {
    const {client_firstName, client_lastName, client_email, client_password} = req.body

    db.query("SELECT * FROM clients WHERE client_email = ?", [client_email], (err, result) => {

        if(err){
            return res.status(500).json({message: "erreur du serveur"})
            // console.log(id)
        }
        // si l'eamil est deja dans db =>
        if(result.length > 0){
            return res.status(400).json({message: "email adress use"})
            // console.log(id)
        }


    })






//     hachage password
    bcrypt.hash(client_password, 10, (err, hash) => {
        if (err) {
            return res
            .status(500)
                .json({message: "erreur lors du hachage"})
        }

    //     insertion du new client
        db.query("INSERT INTO clients (client_firstName, client_lastName, client_email, client_password) VALUES (?,?,?,?)",
            [client_firstName, client_lastName, client_email, hash],
            (err, result) => {
            if (err)

            {
                // console.error(err);
                return res
                    .status(500)
                    .json({message: "erreur lors de l'inscription"})
            }
            res.status(201).json({message: "Inscrpition reussi", client_id: result.insertId})
            })
    })
})


// login
router.post("/clients/login", (req, res) => {
    const {client_email, client_password} = req.body;
    db.query('SELECT * FROM clients WHERE client_email = ?', [client_email], (err, result) => {

        if(err) return res.status(500).json({message: "erreur du serveur 1"});
        console.log(result)
        if(result.length === 0) return res.status(401).json({message: 'Identifiant incorrect 1'});

    const client = result[0]

    //     verif passowrd
        bcrypt.compare(client_password, client.client_password, (err, isMatch) => {
            if(err) return res.status(500).json({message: "erreur du serveur 2"})
            if(!isMatch) return  res.status(401).json({message: 'identifiant incorrect 2'})
        //     generation d'un toke
            const token = sign(
                {id : client.client_id, email: client.client_email},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES_IN}
            )

        res.json({
            message: 'Connexion reussi',
            token,
            client: {id: client.client_id, nom: client.client_lastName, prenom: client.client_firstName, email: client.client_email}
        })
        })
    })
})


// ajout de produit
router.post('/products/add', (req, res) => {
    const {product_name, product_desc, product_price, product_img, product_stock, product_weight, product_categorie_id} = req.body
    db.query("INSERT INTO products(product_name, product_desc, product_price, product_img, product_stock, product_weight, product_categorie_id) VALUES (?,?,?,?,?,?,?)",
        [product_name, product_desc, product_price, product_img, product_stock, product_weight, product_categorie_id],
        (err, result) => {
            if (err)

            {
                // console.error(err);
                return res
                    .status(500)
                    .json({message: "erreur lors de l'inscription"})
            }
            res.status(201).json({message: "Produit ajouter", client_id: result.insertId})
        })
})

// delete product
router.delete('/products/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.query('DELETE FROM products WHERE product_serial_number = ?', [id], (err, result) => {
        if(err){
            return res.status(500).json({message: 'erreur du serveur'})
        }
        if(result.length === 0){
            return  res.status(404).json({message: 'client non trouver'})
        }
        res.json(result[0])
    })
})

// fiche client
router.get("/client/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // ---- ou - facon d'extructurer + rapide et
    // const {id} = req.params;


    db.query("SELECT client_email, client_firstName, client_lastName FROM clients WHERE clients.client_id = ?", [id], (err, result) => {

        if(err){
            return res.status(500).json({message: "erreur du serveur"})
            // console.log(id)
        }
        if(result.length === 0){
            return res.status(404).json({message: "client non trouver"})
            // console.log(id)
        }
        res.json(result[0]) // retournera uniquement le 1er resultat

    })
})

// produit pas categirue
router.get("/products_by_categorie/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // ---- ou - facon d'extructurer + rapide et
    // const {id} = req.params;


    db.query("SELECT * FROM products WHERE product_categorie_id = ?", [id], (err, result) => {

        if(err){
            return res.status(500).json({message: "erreur du serveur"})
            // console.log(id)
        }
        if(result.length === 0){
            return res.status(404).json({message: "produit non trouver"})
            // console.log(id)
        }
        res.json(result[0]) // retournera uniquement le 1er resultat

    })
})
// delete client
router.delete('/client_del/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.query('DELETE FROM clients WHERE client_id = ?', [id], (err, result) => {
        if(err){
            return res.status(500).json({message: 'erreur du serveur'})
        }
        if(result.length === 0){
            return  res.status(404).json({message: 'client non trouver'})
        }
        res.json(result[0])
    })
})



// modifier mot de passe
router.put('/client_modif_pass/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const {client_password} = req.body
    db.query('UPDATE clients SET client_password = ? WHERE client_id = ?',
        [client_password, id], (err, result) => {
            if(err){
                return res.status(500).json({message: 'erreur du serveur'})
            }
            if(result.length === 0){
                return  res.status(404).json({message: 'client non trouver'})
            }
            res.json(result[0])
        })
    res.status(200).json({message: "Modification reussi"})

})


// delete client
// router.delete('/client_del/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//
//     db.query('DELETE FROM clients WHERE client_id = ?', [id], (err, result) => {
//         if(err){
//             return res.status(500).json({message: 'erreur du serveur'})
//         }
//         if(result.length === 0){
//             return  res.status(404).json({message: 'client non trouver'})
//         }
//         res.json(result[0])
//     })
// })



router.put('/client_del/:id', (req,res) => {
    const id = parseInt(req.params.id)

    db.query('UPDATE clients SET client_firstName = "CLIENT DELETE", client_lastName = "CLIENT DELETE", client_email = "CLIENT DELETE", client_password = "CLIENT DELETE" WHERE client_id = ?',
        [id], (err, result) => {
            if(err){
                return res.status(500).json({message: 'erreur du serveur'})
            }
            if(result.length === 0){
                return  res.status(404).json({message: 'client non trouver'})
            }
            res.json(result[0])
        })
    res.status(200).json({message: "Client supprime"})

})

// list commande client

router.get('/client_command/:id', (req, res) => {
    const id = parseInt(req.params.id)
    db.query('SELECT command_lines.command_id, command_lines.product_serial_number, products.product_name, commands.client_id FROM command_lines INNER JOIN products ON products.product_serial_number = command_lines.product_serial_number INNER JOIN commands ON commands.command_id = command_lines.command_id WHERE commands.client_id = ? GROUP BY command_lines.command_id, command_lines.product_serial_number, products.product_name, commands.client_id;',
        [id], (err, result) => {
            if(err){
                return res.status(500).json({message: 'erreur du serveur'})
            }
            if(result.length === 0){
                return  res.status(404).json({message: 'client non trouver'})
            }
            res.json(result)
        })

})

// add panier



// router.post("/products/addCart", (req,res) => {
//     const {command_id, command_statut, client_id, seller_id} = req.body
//
//     // verifier si le client a deja une commande en cours
//     db.query("SELECT * FROM commands WHERE client_id = ? AND command_statut = 1", [client_id, command_statut], (err, result) => {
//         // erreur du serveur
//         if (err) {
//             return res.status(500).json({message: "erreur du serveur"})
//             // console.log(id)
//         }
//
//         // si pas de commande en cours creer une nouvelle commande
//         if (result.length === 0) {
//             return res.status(400).json({message: "no command"})
//             db.query('INSERT INTO commands (command_statut, client_id) VALUES (0, ?)')
//             // console.log(id)
//         }
//
//
//     })
//     // sinon si le produit choisi n'a jamais jamais etais selectionner
//
//     db.query("SELECT * FROM command_lines JOIN commands ON command_lines.command_id = commands.command_id WHERE commands.client_id = ? AND command_quantity > 0",
//         [client_id], (err, result) => {
//
//             if (err) {
//                 return res.status(500).json({message: "erreur du serveur"})
//                 // console.log(id)
//             }
//
//             if (result.length > 0) {
//                 return res.status(400).json({message: "product exist"})
//                 db.query('INSERT INTO command_lines (command_quantity, command_id, product_serial_number) VALUES (+1, ?,?)')
//                 // console.log(id)
//             }
//
//
//
//             db.query("INSERT INTO command_lines (command_quantity, command_id, product_serial_number) VALUES (1, ?,?)",
//                 [command_quantity, command_id, product_serial_number],
//                 (err, result) => {
//                     if (err) {
//                         // console.error(err);
//                         return res
//                             .status(500)
//                             .json({message: "erreur lors de l'inscription"})
//                     }
//
//                     res.status(201).json({message: "Inscrpition reussi", client_id: result.insertId})
//                 })
//         })










router.post("/products/addCart", (req, res) => {
    const { product_serial_number, client_id } = req.body;

    // Vérifier si une commande existe pour le client avec statut "en cours"
    db.query(
        "SELECT * FROM commands WHERE client_id = ? AND command_statut = 1",
        [client_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Erreur du serveur" });
            }

            // Si aucune commande en cours n'existe, créer une nouvelle commande
            if (result.length === 0) {
                db.query(
                    'INSERT INTO commands (command_statut, client_id, seller_id) VALUES (1, ?, 1)',
                    [client_id],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: "Erreur lors de la création de la commande" });
                        }
                        const command_id = result.insertId;

                        // Ajouter une ligne dans la commande avec une quantité de 1
                        db.query(
                            "INSERT INTO command_lines (command_quantity, command_id, product_serial_number) VALUES (?, ?, ?)",
                            [1, command_id, product_serial_number],
                            (err, result) => {
                                if (err) {
                                    return res.status(500).json({ message: "Erreur lors de l'ajout au panier" });
                                }

                                res.status(201).json({ message: "Produit ajouté au panier", command_line_id: result.insertId });
                            }
                        );
                    }
                );
            } else {
                const command_id = result[0].command_id;  // Récupérer l'ID de la commande existante

                // Vérifier si le produit existe déjà dans la commande
                db.query(
                    "SELECT * FROM command_lines WHERE command_id = ? AND product_serial_number = ?",
                    [command_id, product_serial_number],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: "Erreur du serveur" });
                        }

                        if (result.length > 0) {
                            // Si le produit existe déjà, ajouter +1 à la quantité actuelle
                            const new_quantity = result[0].command_quantity + 1;  // Ajoute 1 à la quantité existante
                            db.query(
                                "UPDATE command_lines SET command_quantity = ? WHERE command_line_id = ?",
                                [new_quantity, result[0].command_line_id],
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).json({ message: "Erreur lors de la mise à jour du panier" });
                                    }

                                    res.status(200).json({ message: "Quantité mise à jour" });
                                }
                            );
                        } else {
                            // Si le produit n'existe pas, l'ajouter avec une quantité de 1
                            db.query(
                                "INSERT INTO command_lines (command_quantity, command_id, product_serial_number) VALUES (?, ?, ?)",
                                [1, command_id, product_serial_number],
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).json({ message: "Erreur lors de l'ajout au panier" });
                                    }

                                    res.status(201).json({ message: "Produit ajouté au panier" });
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});

// - 1 panier
router.post("/client/cart/updateQuantityMore", (req, res) => {
    const { client_id, product_serial_number } = req.body;

    if (!client_id || !product_serial_number) {
        return res.status(400).json({ message: "Client ID ou Serial Number du produit manquant" });
    }

    // Requête SQL avec jointure et utilisation des variables
    db.query(
        `UPDATE command_lines
        JOIN commands ON commands.command_id = command_lines.command_id
        JOIN clients ON clients.client_id = commands.client_id
        SET command_quantity = command_quantity + 1
        WHERE clients.client_id = ? 
        AND commands.command_statut = 1 
        AND command_lines.product_serial_number = ?`,
        [client_id, product_serial_number],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Erreur du serveur" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Aucune ligne de commande trouvée ou aucune mise à jour effectuée" });
            }

            res.status(200).json({ message: "Quantité modifiée" });
        }
    );
});



// detail commande
router.post("/client/cart", (req, res) => {
    const { client_id } = req.body;

    if (!client_id) {
        return res.status(400).json({ message: "Client ID manquant" });
    }

    db.query(
        "SELECT command_lines.*, clients.client_id, products.* " +
        "FROM command_lines " +
        "JOIN commands ON commands.command_id = command_lines.command_id " +
        "JOIN clients ON clients.client_id = commands.client_id " +
        "JOIN products ON products.product_serial_number = command_lines.product_serial_number " +
        "WHERE commands.command_statut = 1 AND clients.client_id = ?;",
        [client_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Erreur du serveur" });
            }
            res.json(result);
        }
    );
});


// del ligne panier
router.delete('/client/cart/deleteLine', (req, res) => {
    const { client_id,command_line_id } = req.body;


    db.query('DELETE command_lines FROM command_lines JOIN commands ON commands.command_id = command_lines.command_id JOIN clients ON clients.client_id = commands.client_id WHERE command_lines.command_line_id = ? AND clients.client_id = ? AND commands.command_statut = 1;', [command_line_id], (err, result) => {
        if(err){
            return res.status(500).json({message: 'erreur du serveur'})
        }
        if(result.length === 0){
            return  res.status(404).json({message: 'produit non trouver'})
        }
        res.json(result[0])
    })
})



// modifier client

router.put('/client_modif/', (req, res) => {
    const { Newemail, client_id } = req.body;

    console.log("Données reçues : ", { Newemail, client_id });  // Ajoute un log pour voir ce qui est reçu par le serveur

    db.query('UPDATE clients SET client_email = ? WHERE client_id = ?',
        [Newemail, client_id], (err, result) => {
            if (err) {
                console.error("Erreur de base de données :", err); // Ajoute un log pour afficher l'erreur de la base de données
                return res.status(500).json({ message: 'Erreur du serveur' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Client non trouvé' });
            }

            console.log("Résultat de la requête :", result);  // Ajoute un log pour voir le résultat de la requête
            res.json({ message: "Modification réussie" });
        }
    );
});



router.get('/test', (req, res) => {
    console.log(req.headers);
    res.json(req.headers);
});

module.exports = router;
