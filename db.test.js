const mysql = require('mysql2')

require('dotenv').config({path: './env.test'}); // permet de charger les variables d'environnement

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4' // Remplacez 'cesu8' par 'utf8mb4'
})

db.connect((error) => {
    if (error) {
        console.error("Erreur de connexion mysql :", error);
        throw new Error("Connexion échouée");
    }
    console.log("Connecté à la base de données MySQL");
});

module.exports = db;