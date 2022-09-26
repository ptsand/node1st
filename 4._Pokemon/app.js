import express from "express";
const app = express();

import path from "path";

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/frontpage.html"));
});

app.get("/pokemon", (req, res) => {
    fetch("https://pokeapi.co/api/v2/pokemon").then(res=>res.json()).then(pokemon=>{
        res.send({ data: pokemon.results });
    });
});

app.get("/lookunderthebed", (req, res) => {
    if (req.query.flashlight) {
        res.send({ message: "you are safe"});
    } else {
        res.redirect("/monsters");
    }
});

app.get("/monsters", (req, res) => {
    res.send({ message: "Scary monsters!" })
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
    console.log("Server is running on port", PORT);
});