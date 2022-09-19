import express from "express";
const app = express();

const weapons = [
    { id: 1, name: "handgun", weightInGrams: 500, color: "red" },
    { id: 2, name: "shotgun", weightInGrams: 1000, color: "blue" },
    { id: 3, name: "machinegun", weightInGrams: 2000, color: "black" },
]
let currentId = weapons[weapons.length-1].id
// for PUT and POST validation
const invalidReqBody = (reqBody)=>
    !(reqBody.name && Number.isFinite(Number(reqBody.weightInGrams)) && reqBody.color);

app.use(express.urlencoded({extended:false})); // parse urlencoded request body with the querystring library
app.use(express.json()); // parse json

app.get("/weapons", (req, res) => {
    res.json(weapons);
});

app.get("/weapons/:id([0-9]+)", (req, res) => {
    const weapon = weapons.find(weapon => weapon.id === Number(req.params.id));
    if (weapon) {
        res.json(weapon);
    } else {
        res.status(404);
        res.json({message: "Weapon not found"});
    }
});

app.post("/weapons", (req, res) => {
    if (invalidReqBody(req.body)) {
        res.status(400);
        res.json({message: "Invalid or missing input"});
        return;
    }
    // auto increment id, concat with valid req.body
    const weapon = {id: ++currentId, ...req.body};
    weapons.push(weapon);
    res.json({message: `Added weapon: ${JSON.stringify(weapon)}`});
});

app.put("/weapons/:id([0-9]+)", (req, res) => {
    if (invalidReqBody(req.body)) {
        res.status(400);
        res.json({message: "Invalid or missing input"});
        return;
    }
    const id = Number(req.params.id);
    const index = weapons.findIndex(weapon => weapon.id === id);
    if (index !== -1) { // Weapon with id exists
        weapons[index] = {id: id, ...req.body};
        res.json({message: `Updated weapon: ${JSON.stringify(weapons[index])}`});
        return;
    }
    // else create
    const weapon = {id: ++currentId, ...req.body};
    weapons.push(weapon);
    res.json({message: `Added weapon: ${JSON.stringify(weapon)}`});
});

app.patch("/weapons/:id([0-9]+)", (req, res) => {
    // Partial update, supplied fields only
    const id = Number(req.params.id);
    const index = weapons.findIndex(weapon => weapon.id === id);
    if (index !== -1) { // weapon with id exists, patch supplied fields
        if (req.body.name) weapons[index].name = req.body.name;
        if (Number.isFinite(Number(req.body.weightInGrams))) weapons[index].weightInGrams = req.body.weightInGrams;
        if (req.body.color) weapons[index].color = req.body.color;
        res.json({message: `Patched weapon: ${JSON.stringify(weapons[index])}`});
        return;
    }
    res.status(404);
    res.json({message: "Weapon not found"});
});

app.delete("/weapons/:id([0-9]+)", (req, res) => {
    const id = Number(req.params.id);
    const index = weapons.findIndex(w => w.id === id);
    if (index !== -1) {
        weapons.splice(index, 1);
        res.json({message: `Weapon removed sucessfully`});
        return;
    }
    res.status(404);
    res.json({message: "Weapon not found"});    
});

const port = 8080;
app.listen(port, () => console.log("Server running at port", port));
