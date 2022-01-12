import Express from "express";
import { crearVenta, queryAllVentas, eliminarVenta, editarVenta } from "../../controllers/ventas/controller.js";

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
        crearVenta(req.body, genericCallback(res));
    }
)

rutasVentas.route("/ventas").get(
    (req, res) => {
        console.log("Alguien hizo GET en la ruta /ventas");
        queryAllVentas(genericCallback(res));
    }
)

rutasVentas.route("/ventas/:id").patch(
    (req, res) => {
        console.log("Alguien hizo PATCH a la ruta de /productos/:id");
        editarVenta(req.params.id, req.body, genericCallback(res))
    }
)

rutasVentas.route("/ventas/:id").delete(
    (req, res) => {
        console.log("Alguien hizo DELETE en la ruta de /ventas");
        eliminarVenta(req.params.id, genericCallback(res))
    }
)

export default rutasVentas;
