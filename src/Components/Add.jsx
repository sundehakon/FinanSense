import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const Add = () => {
    const [formData, setFormData] = useState({
        userId: 'secret',
        category: '',
        amount: '',
        description: '',
        date: Date.now(),
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const dataToSend = { ...formData };
            await axios.post('http://localhost:8080/api/Expenses', dataToSend);
            window.location.replace(window.location.href);
            setFormData({
                userId: 'secret', 
                category: '',
                amount: '',
                description: '',
                date: Date.now()
            });
        } catch (error) {
            console.error('Error saving expense: ', error);
        }
    };

    return (
        <Box>
            <Typography variant='h4'>Add Transaction</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="category"
                    label='Category'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    value={formData.category}
                    onChange={handleInputChange}
                />
                <TextField
                    name="amount"
                    label='Amount'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    value={formData.amount}
                    onChange={handleInputChange}
                />
                <TextField
                    name="description"
                    label='Description'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                >
                    Add
                </Button>
            </form>
        </Box>
    );
};

export default Add;