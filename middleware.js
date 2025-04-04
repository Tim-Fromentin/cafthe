const jwt = require("jsonwebtoken");

// Middleware pour la protection des routes
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log("Token reçu:", token);  // Log du token reçu

    if (!token) {
        return res.status(403).json({ message: "Token manquant" });
    }

    // On enlève le "Bearer" si présent dans le token
    const tokenCleaned = token.split(" ")[1];
    if (!tokenCleaned) {
        return res.status(403).json({ message: "Token malformé" });
    }

    // Vérification du token
    jwt.verify(tokenCleaned, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Erreur de décodage du token:", err);
            return res.status(401).json({ message: "Token invalide ou expiré" });
        }
        console.log("Token décodé:", decoded);  // Log du contenu du token
        req.client = decoded;
        next();
    });
};

module.exports = { verifyToken };

