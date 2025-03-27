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

// FINISH route produit
//region List Produit

// GET /api/produits
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupère la liste des produits
 *     description: Retourne tous les produits avec leur catégorie et permet de trier par prix en ordre croissant ou décroissant.
 *     tags: ["produits"]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Filtre les produits par prix (ascendant ou descendant).
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product_id:
 *                     type: integer
 *                     example: 1
 *                   product_name:
 *                     type: string
 *                     example: "Ordinateur portable"
 *                   product_price:
 *                     type: number
 *                     example: 999.99
 *                   product_categorie_id:
 *                     type: integer
 *                     example: 2
 *                   product_categorie_name:
 *                     type: string
 *                     example: "Électronique"
 *       500:
 *         description: Erreur serveur.
 */

router.get("/products", (req, res) => {
    console.log("Requête reçue avec req.query :", req.query);
    const { filter } = req.query;
    let sqlQuery = `SELECT products.*, product_categories.product_categorie_name FROM products
JOIN product_categories ON product_categories.product_categorie_id = products.product_categorie_id`;

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
//endregion


router.get("/products/:id", (req, res) => {
    console.log("Requête reçue avec req.query :", req.query);

    const id = parseInt(req.params.id); // ID de la catégorie
    const { filter } = req.query;

    let sqlQuery = `
        SELECT products.*, product_categories.product_categorie_name, product_categories.product_categorie_id
        FROM products
                 JOIN product_categories ON product_categories.product_categorie_id = products.product_categorie_id
        WHERE product_categories.product_categorie_id = ?`; // Filtrer par catégorie

    const queryParams = [id];

    if (filter === "desc") {
        sqlQuery += " ORDER BY product_price DESC";
    } else if (filter === "asc") {
        sqlQuery += " ORDER BY product_price ASC";
    }

    console.log("Requête SQL exécutée :", sqlQuery, "avec paramètres :", queryParams);

    db.query(sqlQuery, queryParams, (err, result) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ message: "Erreur du serveur" });
        }
        res.json(result);
    });
});



// produit pas categirue
// router.get("/products_by_categorie/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     // ---- ou - facon d'extructurer + rapide et
//     // const {id} = req.params;
//
//
//     db.query("SELECT * FROM products WHERE product_categorie_id = ?", [id], (err, result) => {
//
//         if(err){
//             return res.status(500).json({message: "erreur du serveur"})
//             // console.log(id)
//         }
//         if(result.length === 0){
//             return res.status(404).json({message: "produit non trouver"})
//             // console.log(id)
//         }
//         res.json(result[0]) // retournera uniquement le 1er resultat
//
//     })
// })


// FIXME route 3 meilleurs produit
router.get('/best_product/', (req, res) => {
    db.query(`SELECT products.*, 
       SUM(command_lines.command_quantity) AS total_quantity, 
       command_lines.product_serial_number
FROM products
JOIN command_lines ON command_lines.product_serial_number = products.product_serial_number
JOIN commands ON commands.command_id = command_lines.command_id
WHERE commands.command_statut = 0
GROUP BY products.product_serial_number, command_lines.product_serial_number
ORDER BY total_quantity DESC
LIMIT 3;`, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erreur du serveur" });
        }
        res.json(result);

    })
})





// FINISH produit detail
router.get("/product/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // ---- ou - facon d'extructurer + rapide et
    // const {id} = req.params;




    db.query(`SELECT products.*, product_categories.product_categorie_name FROM products 
JOIN product_categories ON product_categories.product_categorie_id = products.product_categorie_id
WHERE products.product_serial_number = ?`, [id], (err, result) => {

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








// FINISH route inscription d'un client

router.post("/clients/register", (req,res) => {
    console.log(req.body)
    const {client_firstName, client_lastName, client_email, client_born_date, client_adress, client_password} = req.body

    // met une verif ici ;on choux q lq creme
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
        db.query("INSERT INTO clients (client_firstName, client_lastName, client_email,client_born_date,client_adress, client_password, client_first_conn) VALUES (?,?,?,?,?,?,0)",
            [client_firstName, client_lastName, client_email,client_born_date, client_adress, hash],
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


// FINISH route login
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
                {id : client.client_id, email: client.client_email, adresse: client.client_adress},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES_IN}
            )

        res.json({
            message: 'Connexion reussi',
            token,
            client: {id: client.client_id, nom: client.client_lastName, prenom: client.client_firstName, email: client.client_email, adresse: client.client_adress}
        })
        })
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



// FIXME refaire cette route
router.post("/products/addCart", (req, res) => {
    console.log("Requête reçue :", req.body);

    const { product_serial_number, client_id } = req.body;
    if (!product_serial_number || !client_id) {
        return res.status(400).json({ message: "Données manquantes" });
    }

    db.query(
        "SELECT * FROM commands WHERE client_id = ? AND command_statut = 1",
        [client_id],
        (err, result) => {
            if (err) {
                console.error("Erreur MySQL:", err);
                return res.status(500).json({ message: "Erreur du serveur" });
            }

            if (result.length === 0) {
                db.query(
                    "INSERT INTO commands (command_statut, client_id, seller_id, command_total) VALUES (1, ?, 1, 0)",
                    [client_id],
                    (err, result) => {
                        if (err) {
                            console.error("Erreur lors de la création de la commande:", err);
                            return res.status(500).json({ message: "Erreur lors de la création de la commande" });
                        }

                        const command_id = result.insertId;
                        console.log("Commande créée avec ID:", command_id);

                        db.query(
                            "INSERT INTO command_lines (command_quantity, command_id, product_serial_number) VALUES (1, ?, ?)",
                            [command_id, product_serial_number],
                            (err, result) => {
                                if (err) {
                                    console.error("Erreur lors de l'ajout du produit au panier:", err);
                                    return res.status(500).json({ message: "Erreur lors de l'ajout au panier" });
                                }
                                res.status(201).json({ message: "Produit ajouté au panier" });
                            }
                        );
                    }
                );
            } else {
                const command_id = result[0].command_id;
                console.log("Commande existante, ID:", command_id);

                db.query(
                    "SELECT * FROM command_lines WHERE command_id = ? AND product_serial_number = ?",
                    [command_id, product_serial_number],
                    (err, result) => {
                        if (err) {
                            console.error("Erreur MySQL:", err);
                            return res.status(500).json({ message: "Erreur du serveur" });
                        }

                        if (result.length > 0) {
                            const new_quantity = result[0].command_quantity + 1;
                            console.log("Mise à jour de la quantité:", new_quantity);

                            db.query(
                                `UPDATE command_lines
JOIN products ON products.product_serial_number = command_lines.product_serial_number
SET command_quantity = ?
WHERE command_line_id = ?
AND products.product_stock > command_lines.command_quantity;
`,
                                [new_quantity, result[0].command_line_id],
                                (err, result) => {
                                    if (err) {
                                        console.error("Erreur lors de la mise à jour du panier:", err);
                                        return res.status(500).json({ message: "Erreur lors de la mise à jour du panier" });
                                    }
                                    res.status(200).json({ message: "Quantité mise à jour" });
                                }
                            );
                        } else {
                            db.query(
                                "INSERT INTO command_lines (command_quantity, command_id, product_serial_number) VALUES (1, ?, ?)",
                                [command_id, product_serial_number],
                                (err, result) => {
                                    if (err) {
                                        console.error("Erreur lors de l'ajout au panier:", err);
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





// router.post("/products/addCart", (req, res) => {
//     const { product_serial_number, client_id } = req.body;
//     if (!client_id || !product_serial_number) {
//         return res.status(400).json({ message: "Client ID ou Serial Number du produit manquant" });
//     }
//     db.query("SELECT * FROM commands WHERE commands.client_id = ? AND commands.command_statut = 1",
//         [client_id],
//         (err, result) => {
//             if (err) {
//                 return res.status(500).json({ message: "Erreur du serveur" });
//             }
//
//             if (result.length === 0) {
//                 return res.status(404).json({ message: "Aucune commande en cours" });
//                 db.query('INSERT INTO commands (command_statut, client_id) VALUES(1,?)', [client_id])
//             }
//             db.query(`SELECT * FROM command_lines WHERE command_lines.product_serial_number = ?`,
//                 [product_serial_number],
//                 (err,result) => {
//                     if (err) {
//                         return res.status(500).json({ message: "Erreur du serveur" });
//                     }
//                     if (result.length === 0) {
//                         return res.status(404).json({ message: "Le produit n'est pas encore dans le panier" });
//                         db.query('INSERT INTO command_lines (command_quantity, product_serial_number) VALUES(1,?)',
//                             [product_serial_number])
//                     }
//                     let newQuantity = command_quantity + 1
//                     db.query('INSERT INTO command_lines (command_quantity, product_serial_number) VALUES(newQuanity,?)',
//                         [product_serial_number])
//
//                 }
//         )
//
//             res.status(200).json({ message: "Quantité modifiée" });
//         })
//
// });




// FINISH panier ajouter 1
// + 1 panier
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
             JOIN products ON products.product_serial_number = command_lines.product_serial_number
             SET command_quantity = command_quantity + 1
         WHERE clients.client_id = ?
           AND commands.command_statut = 1
           AND command_lines.product_serial_number = ?
           AND products.product_stock > command_lines.command_quantity`,
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



// FINISH panier enlever 1

// - 1 panier
router.post("/client/cart/updateQuantityLess", (req, res) => {
    const { client_id, product_serial_number } = req.body;

    if (!client_id || !product_serial_number) {
        return res.status(400).json({ message: "Client ID ou Serial Number du produit manquant" });
    }


    db.query(
        `UPDATE command_lines
             JOIN commands ON commands.command_id = command_lines.command_id
             JOIN clients ON clients.client_id = commands.client_id
             SET command_quantity = command_quantity - 1
         WHERE clients.client_id = ?
           AND commands.command_statut = 1
           AND command_lines.product_serial_number = ?
           AND command_lines.command_quantity > 1`,
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


// FIXME uptade cart statut
router.post('/client/cart/paid', (req, res) => {
    const { command_id, adress } = req.body;

    if (!command_id) {
        return res.status(400).json({ message: "Command ID manquant" });
    }

    db.query(`UPDATE commands SET command_statut = 0, command_adress = ?
              WHERE command_id = ?`, [adress, command_id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erreur du serveur" });
            }
            res.json(result);
        })
});


// detail commande
router.post("/client/cart", (req, res) => {
    const { client_id } = req.body;

    if (!client_id) {
        return res.status(400).json({ message: "Client ID manquant" });
    }

    db.query(
        `SELECT command_lines.*, clients.client_id, products.*, commands.command_total
        FROM command_lines
        JOIN commands ON commands.command_id = command_lines.command_id
        JOIN clients ON clients.client_id = commands.client_id
        JOIN products ON products.product_serial_number = command_lines.product_serial_number
        WHERE commands.command_statut = 1 AND clients.client_id = ?;`,
        [client_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Erreur du serveur" });
            }
            res.json(result);
        }
    );
});

// liste commande
router.post("/client/commands", (req, res) => {
    const { client_id } = req.body;

    if (!client_id) {
        return res.status(400).json({ message: "Client ID manquant" });
    }

    db.query(
        `SELECT DISTINCT commands.command_id, commands.client_id
         FROM commands
                  JOIN clients ON clients.client_id = commands.client_id
                  JOIN command_lines ON command_lines.command_id = commands.command_id
                  JOIN products ON products.product_serial_number = command_lines.product_serial_number
         WHERE commands.command_statut = 0
           AND clients.client_id = ?;
        `,
        [client_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Erreur du serveur" });
            }
            res.json(result);
        }
    );
});

router.get("/client/command/:id", (req, res) => {
    const { client_id } = req.query;  // Récupère client_id depuis les paramètres de la requête GET
    const id = parseInt(req.params.id);  // Récupère l'ID de la commande depuis les paramètres de l'URL

    if (!client_id) {
        return res.status(400).json({ message: "Client ID manquant" });
    }

    db.query(
        `SELECT * FROM commands WHERE command_id = ? AND client_id = ?`,
        [id, client_id],  // On passe l'ID de la commande et le client_id pour filtrer les commandes
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Erreur du serveur" });
            }
            if (!result || result.length === 0) {
                return res.status(404).json({ message: "Aucune commande trouvée" });
            }
            res.json(result);
        }
    );
});






// FINISH supprimer ligne panier
// del ligne panier
router.delete('/client/cart/deleteLine', (req, res) => {
    const { client_id,command_line_id } = req.body;


    db.query('DELETE command_lines FROM command_lines JOIN commands ON commands.command_id = command_lines.command_id JOIN clients ON clients.client_id = commands.client_id WHERE command_lines.command_line_id = ? AND clients.client_id = ? AND commands.command_statut = 1;', [command_line_id, client_id], (err, result) => {
        if(err){
            return res.status(500).json({message: 'erreur du serveur'})
        }
        if(result.length === 0){
            return  res.status(404).json({message: 'produit non trouver'})
        }
        res.json(result[0])
    })
})



// FINISH modifier client

router.put('/client_modif/', (req, res) => {
    const { Newemail, NewAdress, client_id } = req.body;

    console.log("Données reçues : ", { Newemail,NewAdress, client_id });  // Ajoute un log pour voir ce qui est reçu par le serveur

    db.query('UPDATE clients SET client_email = ?, client_adress = ? WHERE client_id = ?',
        [Newemail, NewAdress, client_id], (err, result) => {


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

// FINISH modifier mot de passe
router.put('/client_modif_pass/', (req,res) => {
    const {client_id, NewPass} = req.body
    bcrypt.hash(NewPass, 10, (err, hash) => {
        if (err) {
            return res
                .status(500)
                .json({message: "erreur lors du hachage"})
        }
        db.query('UPDATE clients SET client_password = ? WHERE client_id = ?',
            [hash, client_id], (err, result) => {
                if (err) {
                    return res.status(500).json({message: 'erreur du serveur'})
                }
                if (result.length === 0) {
                    return res.status(404).json({message: 'client non trouver'})
                }
                res.json(result[0])
            })
        res.status(200).json({message: "Modification reussi"})
    })
})


// FINISH first con
router.put('/client_first_conn/', (req, res) => {
    const {client_email, NewPass} = req.body;

    bcrypt.hash(NewPass, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({message: "Erreur lors du hachage"});
        }

        db.query(
            'UPDATE clients SET client_password = ?, client_first_conn = 0 WHERE client_email = ? AND client_first_conn = 1',
            [hash, client_email],
            (err, result) => {
                if (err) {
                    return res.status(500).json({message: 'Erreur du serveur'});
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({message: 'Client non trouvé'});
                }
                res.status(200).json({message: "Modification réussie"});
            }
        );
    });
});





router.put('/client_del/', (req, res) => {
    const {client_id} = req.body;
    let newPassword = 'tim';


    db.query('SELECT client_id FROM clients WHERE client_id = ?',
        [client_id],
        (err, clientResult) => {
            if (err) {
                return res.status(500).json({message: 'erreur du serveur'});
            }

            if (clientResult.length === 0) {
                return res.status(404).json({message: 'client non trouvé'});
            }

            // Générer un email unique basé sur l'ID client
            const uniqueEmail = `CLIENT_DELETE_${client_id}`;

            bcrypt.hash(newPassword, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({message: "erreur lors du hachage"});
                }

                db.query('UPDATE clients SET client_firstName = "CLIENT DELETE", client_lastName = "CLIENT DELETE", client_email = ?, client_password = ? WHERE client_id = ?',
                    [uniqueEmail, hash, client_id],
                    (err, result) => {
                        if (err) {
                            console.error("Erreur SQL:", err);
                            return res.status(500).json({message: 'erreur du serveur'});
                        }

                        if (result.affectedRows === 0) {
                            return res.status(404).json({message: 'client non trouvé'});
                        }

                        res.status(200).json({message: "Client supprimé"});
                    });
            });
        });
});

router.get('/test', (req, res) => {
    console.log(req.headers);
    res.json(req.headers);
});

module.exports = router;
