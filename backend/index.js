const express = require("express")

const dbConnect = require("./db/db.config")
const app = express()

const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))

dbConnect()
console.log(`${Math.floor(Math.random()*10000000000)}`);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));