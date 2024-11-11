const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');

async function addEmployee() {
    try {
        // Hash the password with salt 
        const password = await bcrypt.hash('Employee1234!', 10);

        // Create the new employee
        const newEmployee = new Employee({
            username: 'employee1',
            password: password,
        });

        // Save the new employee to the database
        await newEmployee.save();
        console.log('Employee added');
    } catch (err) {
        console.error('Error adding employee:', err);
    } finally {
        // Close the connection to the database
        mongoose.connection.close();
    }
}

// Connect to MongoDB and add the employee
mongoose.connect('mongodb+srv://customer_admin123:customerAdmin%40123@customers.rwbc0.mongodb.net/Customer_Portal?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('Connected to MongoDB');
      addEmployee();
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));
