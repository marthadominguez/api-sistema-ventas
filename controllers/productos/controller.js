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

const editarProducto = async (id, edicion, callback) => {
    const filtroProducto = { _id: new ObjectId(id) }
    const operacion = {
        $set: edicion
    }
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("productos").findOneAndUpdate(
        filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback    
    )

}

const eliminarProducto = async (id, callback) => {
    const filtroProducto = { _id: new ObjectId(id) }
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("productos").deleteOne(filtroProducto, callback);
}

export { queryAllProductos, crearProducto, eliminarProducto, editarProducto }