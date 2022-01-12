import jwt_decode from "jwt-decode";
// import jwtDecode from "jwt-decode";
import { ObjectId } from "mongodb";
import { obtenerDB } from "../../db/db.js";

const queryAllUsers = async (callback) => {
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("usuarios").find({}).limit(50).toArray(callback);
}

const queryAllVendedores = async (callback) => {
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection("usuarios").find({"rol": "vendedor"}).limit(50).toArray(callback);
}

const crearUsuario = async (datosUsuario, callback) => {
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback);
  };

const queryOrCreateUsuario = async (req, callback) => {
    
    // voy a obtener los datos del usuario desde el token en el req.headers.authorization
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);
    // voy a verificar con el correo o el id si el usuario está ya creado
    const baseDeDatos = obtenerDB();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email },
        async (err, response) => {
            console.log('No hay usuario en la base de datos', response);
            if (response) {
                callback(err, response);
            } else {
                user.auth0ID = user._id;
                delete user._id;
                user.rol = 'No asignado';
                user.estado = 'Pendiente';
                await crearUsuario(user, (err, respuesta) => callback(err, user));
            }
        });
};

const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
      $set: edicion,
    };
    const baseDeDatos = obtenerDB();
    await baseDeDatos
      .collection('usuarios')
      .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
  };

export { queryAllUsers, queryOrCreateUsuario, crearUsuario, editarUsuario, queryAllVendedores }