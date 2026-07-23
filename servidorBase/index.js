const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = 3000;

let peliculas = [
    {
        id: 1,
        titulo: "Interestelar",
        director: "Christopher Nolan",
        año: 2014
    },
    {
        id: 2,
        titulo: "Titanic",
        director: "James Cameron",
        año: 1997
    }
];

let idActual = peliculas.length + 1;


// Obtener todas las películas
app.get("/peliculas", (req, res) => {
    res.json(peliculas);
});


// Obtener una película por ID
app.get("/peliculas/:id", (req, res) => {
    const id = Number(req.params.id);
    const pelicula = peliculas.find(
        pelicula => pelicula.id === id
    );
    if (!pelicula) {
        return res.status(404).json({
            mensaje: "Película no encontrada"
        });
    }
    res.json(pelicula);
});


// Registrar una película
app.post("/peliculas", (req, res) => {
    const { titulo, director, año } = req.body;
    if (!titulo || !director || !año) {
        return res.status(400).json({
            mensaje: "Faltan datos de la película"
        });
    }
    const nuevaPelicula = {
        id: idActual++,
        titulo: titulo,
        director: director,
        año: Number(año)
    };
    peliculas.push(nuevaPelicula);
    res.status(201).json({
        mensaje: "Película registrada correctamente",
        pelicula: nuevaPelicula
    });

});


// Actualizar una película
app.put("/peliculas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, director, año } = req.body;
    if (!titulo || !director || !año) {
        return res.status(400).json({
            mensaje: "Faltan datos de la película"
        });
    }
    const indice = peliculas.findIndex(
        pelicula => pelicula.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Película no encontrada"
        });
    }

    peliculas[indice] = {
        id: id,
        titulo: titulo,
        director: director,
        año: Number(año)
    };

    res.json({
        mensaje: "Película actualizada correctamente",
        pelicula: peliculas[indice]
    });

});


// Eliminar una película
app.delete("/peliculas/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = peliculas.findIndex(
        pelicula => pelicula.id === id
    );
    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Película no encontrada"
        });
    }
    const peliculaEliminada = peliculas[indice];

    peliculas.splice(indice, 1);

    res.json({
        mensaje: "Película eliminada correctamente",
        pelicula: peliculaEliminada
    });

});


app.get("/", (req, res) => {
    res.send("Bienvenido al servidor de películas");
});


app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:" + PORT);
});