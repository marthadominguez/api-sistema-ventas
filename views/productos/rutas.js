import Express from "express";
import { queryAllProductos, crearProducto, editarProducto, eliminarProducto, queryProductosDisponibles } from "../../controllers/productos/controller.js";
// Importamos de los controladores las operaciones del CRUD

// usada para crear un nuevo objeto router para manejar requests o peticiones
const rutasProductos = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        console.log("Error", err);
        res.status(500).json({ error: err });
    } else {
        res.json(result);
    }
}

// RUTAS
rutasProductos.route("/productos").get(
    (req, res) => {
        console.log("Alguien hizo GET en la ruta /productos");
        queryAllProductos(genericCallback(res));
    }
)

rutasProductos.route("/productos/disponibles").get(
    (req, res) => {
        console.log("Alguien hizo GET en la ruta /productos");
        queryProductosDisponibles(genericCallback(res));
    }
)

rutasProductos.route("/productos").post(
    (req, res) => {
        console.log("Alguien hizo POST a la ruta de /productos");
        crearProducto(req.body, genericCallback(res));
    }
)

rutasProductos.route("/productos/:id").patch(
    (req, res) => {
        console.log("Alguien hizo PATCH a la ruta de /productos/:id");
        editarProducto(req.params.id, req.body, genericCallback(res))
    }
)

rutasProductos.route("/productos/:id").delete(
    (req, res) => {
        console.log("Alguien hizo DELETE en la ruta de /productos");
        eliminarProducto(req.params.id, genericCallback(res))
    }
)

export default rutasProductos;