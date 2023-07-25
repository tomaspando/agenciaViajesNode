//Aca se hacen todas las configuraciones del proyecto. 

import express from "express"
import router from "./routes/index.js"
import db from "./config/db.js" 


console.log(process.env.DB_HOST)

const app = express()

//Conectar la BD:

db.authenticate()
    .then(() => {console.log("Base de datos conectada")})
    .catch( error => console.log(error))

//Definir puerto
const port = process.env.PORT || 4000

//Habilitar PUG
app.set("view engine","pug")

//Obterner el año actual
app.use((req, res, next) => {
    const year = new Date()

    res.locals.actualYear = year.getFullYear()
    res.locals.nombreSitio = "Agencia de Viajes"
    return next() 
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica: Que es donde usualmente va el CSS y las imagenes. 
app.use(express.static("public"))

//Agregar Router
app.use("/", router)

app.listen(port, () => {
    console.log(`El servidor esta funcinoando en el puerto ${port}`)
})