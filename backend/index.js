const express = require("express")
const cors = require("cors")

const dbConnect = require("./db/db.config")
const employeeRouter = require("./routes/employee.routes")

const PORT = 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))

app.use('/emp', employeeRouter)

dbConnect()
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));