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
    const weapon = { ...req.body, id: ++currentId };
    weapons.push(weapon);
    res.json({message: "Weapon created", data: weapon});
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
        weapons[index] = { ...req.body, id: id };
        res.json({message: "Weapon Updated",  data: weapons[index]});
        return;
    }
    // else create
    const weapon = { ...req.body, id: ++currentId};
    weapons.push(weapon);
    res.status(201).json({message: "Weapon created", data: weapon});
});

app.patch("/weapons/:id([0-9]+)", (req, res) => {
    // Partial update, supplied fields only
    const id = Number(req.params.id);
    const index = weapons.findIndex(weapon => weapon.id === id);
    if (index !== -1) {
        // weapon with id exists, patch supplied fields (if identical keys, the last takes effect)
        weapons[index] = { ...weapons[index], ...req.body, id: req.params.id }
        res.json({message: "Weapon patched", data: weapons[index]});
        return;
    }
    res.status(404).json({message: `Weapon with id ${id} not found`});
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
