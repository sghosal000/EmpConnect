const express = require("express")
const {
    createEmp,
    getEmps,
    getEmp,
    updateEmp,
    removeEmp
} = require("../controllers/employee.controller")

const employeeRouter = express.Router()

employeeRouter.post('/add', createEmp)
employeeRouter.get('/', getEmps)
employeeRouter.get('/:empId', getEmp)
employeeRouter.put('/update/:empId', updateEmp)
employeeRouter.delete('/remove/:empId', removeEmp)

module.exports = employeeRouter