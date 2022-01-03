// const express = require("express");
import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./db/db.js";

// se importan todas las rutas
import rutasProductos from "./views/productos/rutas.js";

dotenv.config({path: "./.env"})

const app = Express()

// nos convierte el body del req en un objeto que podemos utilizar
app.use(Express.json())
app.use(Cors())
app.use(rutasProductos)


const main = () => {
  return app.listen(process.env.PORT || 5000, ()=>{console.log(`Escuchando puerto ${process.env.PORT}`)})
}

conectarDB(main)