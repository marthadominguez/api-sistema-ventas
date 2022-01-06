import { obtenerDB } from "../../db/db.js";

const crearVenta = async (datosVenta, callback) => {
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("ventas").insertOne(datosVenta, callback);
}

export { crearVenta }


