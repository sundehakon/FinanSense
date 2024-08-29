import { Box, Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";

const View = () => {
    const [showForm, setShowForm] = useState(false);
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
                <IconButton
                    onClick={() => setShowForm(false)}   
                    sx={{ mt: 2 }}
                >
                    <ExpandLessIcon />
                </IconButton>
            }
        </Box>
    );
};

export default View;