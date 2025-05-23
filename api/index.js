const express = require('express');
const serverless = require('serverless-http');

const paymentRoutes = require('./routes/paymentRoutes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/v1/payments', paymentRoutes);

module.exports.handler = serverless(app);
