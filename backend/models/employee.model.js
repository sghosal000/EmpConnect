const mongoose = require("mongoose")

const empSchema = new mongoose.Schema({
    empId: {
        type: Number,
        required: [true, "employee ID is required"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "employee name is required"],
    },
    department: {
        type: String,
        // enum: [ "HR", "IT", "Sales" ],
    },
    designation: {
        type: String,
    },
    salary: {
        type: Number,
    },
})

module.exports = mongoose.model("Employee", empSchema)