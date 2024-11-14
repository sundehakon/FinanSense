import React, { useState } from "react";
import { Box, TextField, Button, FormControl, Select, MenuItem, InputLabel, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Add = () => {
    const [showForm, setShowForm] = useState(true);
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        userId: '',
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
            await axios.post(`http://localhost:8080/api/Expenses?userId=${user?.sub}`, dataToSend);
            window.location.replace(window.location.href);
            setFormData({
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
        <Box sx={{ width: 500 }}>
            {!showForm &&
                <IconButton
                    onClick={() => setShowForm(true)}   
                    sx={{ mt: 2 }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            }
            {showForm &&
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin='normal'>
                    <InputLabel id='category-label' color='secondary'>Category</InputLabel>
                    <Select
                        labelId='category-label'
                        id='category'
                        name='category'
                        label='Category'
                        color='secondary'
                        value={formData.category}
                        onChange={handleInputChange}
                        sx={{ textAlign: 'left' }}
                    >
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Transport">Transport</MenuItem>
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                        <MenuItem value="Utilities">Utilities</MenuItem>
                        <MenuItem value="Healthcare">Healthcare</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name='amount'
                    label='Amount'
                    variant='outlined'
                    margin='normal'
                    color='secondary'
                    fullWidth
                    value={formData.amount}
                    onChange={handleInputChange}
                />
                <TextField
                    name='description'
                    label='Description'
                    variant='outlined'
                    margin='normal'
                    color='secondary'
                    fullWidth
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Add
                </Button>
                <IconButton
                    onClick={() => setShowForm(false)}
                    sx={{ mt: 2 }}
                >
                    <ExpandLessIcon />
                </IconButton>
            </form>
    }
        </Box>
    );
};

export default Add;