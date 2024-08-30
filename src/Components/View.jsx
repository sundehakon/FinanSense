import { Box, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
    const [showForm, setShowForm] = useState(true);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Expenses');
                setExpenses(response);
            } catch (error) {
                console.error('Error fetching expenses', error);
            }
        };

        fetchExpenses();
    });

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
            {showForm && (
                <Box>
                    {expenses.length > 0 ? (
                        expenses.map((expense, index) => (
                            <Box key={index}>
                                <Typography>{expense.category}</Typography>
                                <Typography>{expense.amount}</Typography>
                                <Typography>{expense.description}</Typography>
                                <Typography>{expense.date}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant='subtitle1' sx={{ marginTop: 3 }}>No expenses to display</Typography>
                    )}
                    <IconButton
                        onClick={() => setShowForm(false)}   
                        sx={{ mt: 2 }}
                    >
                        <ExpandLessIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default View;