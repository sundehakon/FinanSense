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

app.post('api/Expenses', async (req, res) => {
    const { userId, category, amount, description, date } = req.body;

    const expenses = new Expenses({
        userId,
        category,
        amount,
        description,
        date,
    });

    try {
        const savedExpenses = await expenses.save();
        res.status(200).json(savedExpenses);
    } catch (err) {
        res.status(500).send(err);
    }
});

db.on('error', (error) => {
    console.error('MongoDB connection error: ' + error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
});