import Express from "express";
import { queryAllUsers, queryOrCreateUsuario, crearUsuario, editarUsuario } from "../../controllers/usuarios/controller.js";

const rutasUsuarios = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        console.log("Error", err);
        res.status(500).json({ error: err });
    } else {
        res.json(result);
    }
}

// RUTAS
rutasUsuarios.route("/usuarios").get(
    (req, res) => {
        console.log("Alguien hizo GET en la ruta /usuarios");
        queryAllUsers(genericCallback(res));
    }
)

rutasUsuarios.route("/usuarios").post((req, res) => {
    console.log("Alguien hizo POST en la ruta /usuarios");
    crearUsuario(req.body, genericCallback(res));
});

rutasUsuarios.route('/usuarios/self').get((req, res) => {
    console.log('alguien hizo GET en la ruta /self');
    queryOrCreateUsuario(req, genericCallback(res));
});

rutasUsuarios.route('/usuarios/:id').patch((req, res) => {
    editarUsuario(req.params.id, req.body, genericCallback(res));
});

export default rutasUsuarios;