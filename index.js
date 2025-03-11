const express = require("express")

const cors = require("cors")

const db = require('./db') // connexion a mysql

const routes = require('./endpoints') // les routes de l'api

const app = express()
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(express.json())
app.use(cors())


// Configuration de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API CafThé Documentation",
            version: "1.0.0",
            description: "Documentation de l'API CafThé avec Swagger",
        },
        servers: [
            {
                url: `http://localhost:3000/api`,
            },
        ],
    },
    apis: ["./endpoints.js"],
};

// Initialisation de Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



//Utilisation des routes
app.use('/api', routes)

// demarrer le serveur
const PORT = process.env.PORT  || 3000
app.listen(PORT, () => {
    console.log(`L'api est demarrer sur http://localhost:${PORT}`)
})


