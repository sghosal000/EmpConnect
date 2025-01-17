const express = require("express")
const {
    createEmp,
    getEmps,
    getEmp,
    updateEmp,
    removeEmp,
    filterEmp
} = require("../controllers/employee.controller")

const employeeRouter = express.Router()

employeeRouter.post('/add', createEmp)
employeeRouter.get('/', getEmps)
employeeRouter.get('/id/:empId', getEmp)
employeeRouter.put('/update/:empId', updateEmp)
employeeRouter.delete('/remove/:empId', removeEmp)
employeeRouter.get('/filter', filterEmp)

module.exports = employeeRouter