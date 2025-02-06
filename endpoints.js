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


module.exports = router;
