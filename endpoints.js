const express = require('express')

const db = require('./db')

const bcrypt = require('bcrypt')
const {hash} = require("bcrypt");
const url = require("node:url");

const router = express.Router()





// route: lister les produits
// GET /api/produits
router.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if(err){
            return res.status(500).json({message: "erreur du serveur"})
        }
        res.json(result)
    })
})


router.get("/products/:id", (req, res) => {
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

// modifier client

router.put('/client_modif/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const {client_firstName, client_lastName, client_email} = req.body
    db.query('UPDATE clients SET client_firstName = ?, client_lastName = ?, client_email = ? WHERE client_id = ?',
        [client_firstName, client_lastName, client_email, id], (err, result) => {
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

// details commands



module.exports = router;
