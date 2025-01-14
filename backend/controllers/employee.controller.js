const mongoose = require("mongoose")
const Employee = require("../models/employee.model")
const { v4: uuidv4 } = require("uuid")


const generateEmpId = async () => {
    let empId
    do {
        empId = Math.floor(Math.random() * 10000000000)
    } while (await Employee.findOne({ empId }));
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