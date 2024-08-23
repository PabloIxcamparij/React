import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.Database_URL);

// Podemos forzar el ssl poniendo al final ?ssl=true

/*
Otra opcion es poner al final
, {
    dialectOptions: {
        ssl : {
            requiere: false
        }
    }
}
*/

export default db