import Express from "express";
import { crearVenta } from "../../controllers/ventas/controller.js";

const rutasVentas = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        console.log("Error", err);
        res.status(500).json({ error: err });
    } else {
        res.json(result);
    }
}

// RUTAS
rutasVentas.route("/ventas").post(
    (req, res) => {
        console.log("Alguien hizo POST en la ruta /ventas");
        queryAllUsers(genericCallback(res));
    }
)

export default rutasVentas;
