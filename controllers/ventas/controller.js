import { ObjectId } from "mongodb";
import { obtenerDB } from "../../db/db.js";

const crearVenta = async (datosVenta, callback) => {
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("ventas").insertOne(datosVenta, callback);
}

const queryAllVentas = async (callback) => {
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("ventas").find({}).limit(50).toArray(callback);
}

const editarVenta = async (id, edicion, callback) => {
    const filtroVenta = { _id: new ObjectId(id) }
    const operacion = {
        $set: edicion
    }
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("ventas").findOneAndUpdate(
        filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback    
    )

} 

const eliminarVenta = async (id, callback) => {
    const filtroVenta = { _id: new ObjectId(id) }
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("ventas").deleteOne(filtroVenta, callback);
}

export { crearVenta, queryAllVentas, eliminarVenta, editarVenta }


