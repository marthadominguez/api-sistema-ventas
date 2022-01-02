import { ObjectId } from "mongodb";
import { obtenerDB } from "../../db/db.js";

const queryAllProductos = async (callback) => {
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("productos").find({}).limit(50).toArray(callback);
}

const crearProducto = async (datosProducto, callback) => {
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("productos").insertOne(datosProducto, callback);
}

// const consultarProducto

// const editarProducto

// const eliminarProducto

export { queryAllProductos, crearProducto }

// crearProducto, consultarProducto, editarProducto, eliminarProducto 