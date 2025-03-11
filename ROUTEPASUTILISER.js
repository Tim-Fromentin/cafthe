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

