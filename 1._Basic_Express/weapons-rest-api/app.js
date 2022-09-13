import express from "express";
const app = express();

const weapons = [
    { id: 1, name: "handgun", weightInGrams: "500", color: "red" },
    { id: 2, name: "shotgun", weightInGrams: "1000", color: "blue" },
    { id: 3, name: "machinegun", weightInGrams: "2000", color: "black" },
]

app.get("/", (req, res) => {
    res.send("<h2>weapons REST API</h2>");
});

app.get("/weapons", (req, res) => {
    res.send(weapons);
});

app.get("/weapons/:id", (req, res) => {
    res.send(weapons.filter(weapon => weapon.id === Number(req.params.id)));
});

const port = 8080;
app.listen(port, () => console.log("server running at port", port));
