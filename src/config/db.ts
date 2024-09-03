import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()


//Forma de agregar los modelos a la base de datos

const db = new Sequelize(process.env.Database_URL, {
    models : [__dirname + '/../models/**/*.ts'],
    logging: false
});

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