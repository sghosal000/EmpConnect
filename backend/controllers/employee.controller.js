const mongoose = require("mongoose")
const Employee = require("../models/employee.model")
// const { v4: uuidv4 } = require("uuid")


const generateEmpId = async () => {
    let empId
    do {
        empId = Math.floor(Math.random() * 10000000000)
    } while (await Employee.findOne({ empId }));

    return empId
}

const createEmp = async (req, res) => {
    try {
        const {
            name,
            department,
            designation,
            salary
        } = req.body

        if (!name) {
            return res.status(400).json({ message: "Missing some required field" })
        }

        const empId = await generateEmpId()

        const newEmp = new Employee({
            empId,
            name,
            department,
            designation,
            salary
        })
        await newEmp.save()

        res.status(201).json({ message: "Employee created successfully" })
    } catch (error) {
        console.error(error)
        if (error.name === "ValidationError") {
            return res.status(401).json({ message: "validation error" })
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

const getEmps = async (req, res) => {
    try {
        const emps = await Employee.find().sort({ updatedAt: -1 })

        if (emps.length === 0) {
            return res.status(404).json({ message: "no employee found" })
        }

        res.status(200).json(emps)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

const getEmp = async (req, res) => {
    try {
        const { empId } = req.query
        if (!empId) {
            return res.status(400).json({ message: "missing required field: empId" })
        }

        const emp = await Employee.findOne({ empId })
        if (!emp) {
            return res.status(404).json({ message: "no employee found" })
        }

        res.status(200).json(emp)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateEmp = async (req, res) => {
    try {
        const { empId } = req.query
        const { name, department, designation, salary } = req.body

        if (!empId) {
            return res.status(400).json({ message: "missing required field: empId" })
        }

        const emp = await Employee.find({ empId })
        if (!emp) {
            return res.status(404).json({ message: "no employee found" })
        }

        if (name) emp.name = name
        if (department) emp.department = department
        if (designation) emp.designation = designation
        if (salary) emp.salary = salary

        await emp.save()
        res.status(200).json({ message: "employee details updated successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

const removeEmp = async (req, res) => {
    try {
        const { empId } = req.query
        if (!empId) {
            return res.status(400).json({ message: "missing required field: empId" })
        }

        const emp = await Employee.findOneAndDelete({ empId })
        if (!emp) {
            return res.status(404).json({ message: "no employee found" })
        }

        res.status(200).json({ message: "successfully removed emplpyee details", emp })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    createEmp,
    getEmps,
    getEmp,
    updateEmp,
    removeEmp
}