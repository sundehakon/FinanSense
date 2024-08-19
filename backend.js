require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {});
const db = mongoose.connection;

const expenseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Other'],
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'Expenses' });

const Expenses = mongoose.model('Expenses', expenseSchema);