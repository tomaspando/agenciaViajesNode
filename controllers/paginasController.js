import { Viaje } from "../models/Viaje.js"
import { Testimonial } from "../models/Testimoniales.js"

const paginaInicio = async (req, res) => { //req: Lo que enviamos, res: Lo que express nos responde
    //Consultar 3 viajes del modelo Viaje

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}))
    promiseDB.push(Testimonial.findAll({limit: 3}))

    try {
        const resultado = await Promise.all(promiseDB)
        res.render("inicio", {
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }


}

const paginaNosotros = (req, res) => { //req: Lo que enviamos, res: Lo que express nos responde
    res.render("nosotros", {
        pagina: "Nosotros"
    })
}

const paginaViajes = async (req, res) => { //req: Lo que enviamos, res: Lo que express nos responde

    //Consultar Base de Datos
    const viajes = await Viaje.findAll() //Trae todos los resultados que haya en esa tabla. 

    console.log(viajes)

    res.render("viajes", {
        pagina: "Viajes",
        viajes/* Lo mismo que poner viajes: viajes */,
    })
}

const paginaTestimoniales = async (req, res) => { //req: Lo que enviamos, res: Lo que express nos responde

    try {
        const testimoniales = await Testimonial.findAll()

        res.render("testimoniales", {
            pagina: "Testimoniales", testimoniales
        })
    } catch (error) {
        console.log(error)
    }

}

//Muestra un viaje por su slug: 

const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params 

    try {
        const viaje = await Viaje.findOne({where: {slug} })

        res.render("viaje", {
            pagina: "Información Viaje",
            viaje 
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}