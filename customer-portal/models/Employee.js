const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Employee Schema
const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
