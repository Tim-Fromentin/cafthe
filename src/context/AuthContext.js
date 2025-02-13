import React, { createContext, useState, useEffect } from 'react';

// Exportation du context pour y avoir accès
export const AuthContext = createContext(null);

// Création du provider pour la connexion et la déconnexion
export function AuthProvider({ children }) {
    const [client, setClient] = useState(null); // Stocke les infos du client
    const [token, setToken] = useState(null);   // Stocke le token JWT

    // ✅ Chargement des données depuis localStorage au démarrage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedClient = localStorage.getItem("client");

        if (storedToken && storedClient) {
            setToken(storedToken);
            setClient(JSON.parse(storedClient));
        }
    }, []);

    // ✅ Mise à jour automatique du localStorage quand token/client changent
    useEffect(() => {
        if (token && client) {
            localStorage.setItem('token', token);
            localStorage.setItem('client', JSON.stringify(client));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('client');
        }
    }, [token, client]);

    // ✅ Fonction de connexion (stocke les données)
    const login = (jwt, userData) => {
        setToken(jwt);
        setClient(userData);
    };

    // ✅ Fonction de déconnexion (supprime les données)
    const logout = () => {
        setToken(null);
        setClient(null);
        localStorage.removeItem('token');
        localStorage.removeItem('client');
    };

    const value = {
        token,
        client,
        login,
        logout,
        isAuthenticated: !!token // Retourne `true` si un token est présent
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
