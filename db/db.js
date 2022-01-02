// Aquí pondremos el cliente de Mongo. Queremos que sea compartido a lo largo de toda la app completa. 
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" })

const stringConexion = process.env.DATABASE_URL

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let baseDeDatos;

// esta función será usada en el index.js, y el callback será el main del index, donde la app escucha el puerto. 
const conectarDB = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.error("Error conectando a la base de datos");
            return "error";
        } 
        baseDeDatos = db.db("ventasDB");
        console.log("Conexión a base de datos exitosa");
        return callback();
    })
}

// esta función será usada en los controllers
const obtenerDB = () => {
    return baseDeDatos;
}

export { conectarDB, obtenerDB }

