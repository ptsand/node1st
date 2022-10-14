import express from "express";
import router from "./routers/pokemonRouter.js";

const app = express();

app.use(express.static("public"));
app.use(router);

import { renderPage, injectData } from "./util/templateEngine.js";


const frontpagePage = renderPage("/frontpage/frontpage.html", 
{ 
    tabTitle: "Pokemon", 
    cssLink: `<link rel="stylesheet" href="/pages/frontpage/frontpage.css">` 
});

const contactPage = renderPage("/contact/contact.html");

const battlePage = renderPage("/battle/battle.html", {
    cssLink: `<link rel="stylesheet" href="/pages/battle/battle.css">` 
});

app.get("/", (req, res) => {
    res.send(frontpagePage);
});

app.get("/battle", (req, res) => {
    const randomPokemon = "pikachu";
    res.redirect(`battle/${randomPokemon}`);
});

app.get("/battle/:pokemonName", (req, res) => {
    const pokemonName = req.params.pokemonName;
    const battlePageWithData = injectData(battlePage, { pokemonName });
    res.send(battlePageWithData.replace("%%TAB_TITLE%%", `Battle ${req.params.pokemonName}`));
});

app.get("/contact", (req, res) => {
    res.send(contactPage);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", server.address().port);
});