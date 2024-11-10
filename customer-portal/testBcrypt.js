const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Employee = require('./models/Employee');  // Adjust path as necessary

async function testHashingConsistency() {
    const testUsername = 'employee1';
    const testPassword = 'Employee1234!';

    try {
        await mongoose.connect('mongodb+srv://customer_admin123:customerAdmin%40123@customers.rwbc0.mongodb.net/Customer_Portal?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Fetch the employee from the database
        const employee = await Employee.findOne({ username: testUsername });
        if (!employee) {
            console.log('Employee not found');
            return;
        }
        
        console.log('Stored password hash:', employee.password);

        // Compare entered password with the stored hash
        const match = await bcrypt.compare(testPassword, employee.password);
        console.log('Do the passwords match?', match);
    } catch (err) {
        console.error('Error during test:', err);
    } finally {
        mongoose.connection.close();
    }
}

testHashingConsistency();
