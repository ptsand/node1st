const app = require("express")();

const days = ["sun","mon","tue","wed","thu","fri","sat"];

app.get("/day", (req, res) => {
    res.send(days[new Date().getDay()]);
});

const port = 8080;
app.listen(port, () => console.log("Server running at port", port));