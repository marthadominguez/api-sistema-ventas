// SERVER CONFIGURATION
// const express = require("express");
import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./db/db.js";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

// se importan todas las rutas
import rutasProductos from "./views/productos/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js"
import rutasVentas from "./views/ventas/rutas.js";


dotenv.config({path: "./.env"})

const app = Express()

// nos convierte el body del req en un objeto que podemos utilizar
app.use(Express.json())
app.use(Cors())

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://sistema-ventas.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-sistema-ventas',
issuer: 'https://sistema-ventas.us.auth0.com/',
algorithms: ['RS256']
});

// 4. Verificar que el token sea válido
app.use(jwtCheck);

app.use(rutasProductos)
app.use(rutasUsuarios)
app.use(rutasVentas)


const main = () => {
  return app.listen(process.env.PORT || 5000, ()=>{console.log(`Escuchando puerto ${process.env.PORT}`)})
}

conectarDB(main)