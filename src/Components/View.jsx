import { Box, IconButton, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const View = () => {
    const [showForm, setShowForm] = useState(true);
    const [expenses, setExpenses] = useState([]);

    const { user } = useAuth0();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/Expenses?userId=${user?.sub}`);
                setExpenses(response.data); 
            } catch (error) {
                console.error('Error fetching expenses', error);
            }
        };

        fetchExpenses();
    }, [user?.sub]);
    
    const handleDelete = async (expenseId) => {
        try {
            await axios.delete(`http://localhost:8080/api/Expenses/${expenseId}?userId=${user?.sub}`);
            setExpenses(expenses.filter(expense => expense._id !== expenseId));
        } catch (error) {
            console.error('Error deleting expense:', error);
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
            {showForm && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            expense.userId === user?.sub && (  
                                <Paper key={expense._id} sx={{ marginTop: 3, width: 400, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <Box>
                                        <Typography><strong>Category:</strong> {expense.category}</Typography>
                                        <Typography><strong>Amount:</strong> {expense.amount}</Typography>
                                        <Typography><strong>Description:</strong> {expense.description}</Typography>
                                        <Typography><strong>Date: </strong> {expense.date}</Typography>
                                    </Box>
                                    <Box>
                                        <IconButton onClick={() => handleDelete(expense._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Paper>
                            )
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
