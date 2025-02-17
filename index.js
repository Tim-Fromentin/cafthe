const express = require("express")

const cors = require("cors")

const db = require('./db') // connexion a mysql

const routes = require('./endpoints') // les routes de l'api

const app = express()

app.use(express.json())
app.use(cors())

//Utilisation des routes
app.use('/api', routes)

// demarrer le serveur
const PORT = process.env.PORT  || 3000
app.listen(PORT, () => {
    console.log(`L'api est demarrer sur http://localhost:${PORT}`)
})