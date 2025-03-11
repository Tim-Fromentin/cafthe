const request =  require('supertest');
const express = require('express');
const routeModule = require('../endpoints');
const db = require('../db.test');
const test = require("node:test");

const app = express();
app.use(express.json());
app.use('/api', routeModule);

describe('GET /api/products', () => {
    it('devrait retourner tous les produits', async () => {
        const response = await request(app).get(`/api/products`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('devrait retourner tous les details d un produit', async () => {
        const productId = 3;
        const response = await request(app).get(`/api/products/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("product_categorie_name");


    });
    it('devrait retourner tous les produits', async () => {
        const response = await request(app).get(`/api/best_product/`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

});


describe('POST /api/cart', () => {
    it('la liste de produit dans le panier', async () => {
        const response = await request(app)
            .post(`/api/client/cart`)
            .send({client_id: 6})
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('ajout d un produit dans le panier', async () => {
        // const { product_serial_number, client_id } = req.body;
        const response = await request(app)
            .post(`/api/products/addCart`)
            .send({client_id: 6, product_serial_number: 6, command_id: 31})
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });



});

