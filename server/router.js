const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")

router.get("/", (req, res) => {
    res.type("json").status(200)
    res.sendFile(path.join(__dirname, "db.json"))
})
router.post("/", (req, res) => {
    const responseBody = req.body
    const ID = Math.random() * 9999
    responseBody.id = ID
    const { Users } = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")))
    Users.push(responseBody)
    const data = { Users: Users }
    fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(data))
    res.type("json").status(200)
    res.send(responseBody)
})
router.put("/", (req, res) => {
    const ID = req.body.id
    const { Users } = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")))
    const idx = Users.findIndex(elm => elm.id == ID)
    Users[idx] = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        id: ID
    }
    const elmentUpdate = Users[idx]
    const data = { Users: Users }
    fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(data))
    res.type("json").status(200)
    res.send(elmentUpdate)
})
router.delete("/", (req, res) => {
    const ID = req.body.id
    const { Users } = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")))
    const idx = Users.findIndex(elm => elm.id == ID)
    const elementDelete = Users[idx]
    Users.splice(idx, 1)
    const data = { Users: Users }
    fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(data))
    res.type("json").status(200)
    res.send(elementDelete)
})
module.exports = router