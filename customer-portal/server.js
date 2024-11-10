const express = require('express');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const fs = require('fs'); // ssl setup 
const http = require('http'); 
const cors = require('cors');


const employeeRoutes = require('./routes/employeeRoutes');
const transactionRoutes = require('./routes/transactions');
const customerRoutes = require('./routes/customerRoutes'); // import customer routes
const paymentRoutes = require('./routes/paymentRoutes');  // import payment routes

dotenv.config();

const app = express();
//load SSL certificate and private key
const sslOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};
app.use(express.json()); // middleware
app.use(cors());
app.use('/api/employee', employeeRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from your React app
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


// mongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// for the customer routes (reg and login)
app.use('/api/customers', customerRoutes);
// for the payment routes (transactions)
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 5000;
// start https server
http.createServer(app).listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`); 
});
