import { Box, Typography } from '@mui/material';
import './App.css';
import ChartComponent from './Components/Chart';
import Add from './Components/Add';

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 5, gap: 8 }}>
        <Typography variant='h3'>FinanSense™</Typography>
        <Add />
        <ChartComponent />
      </Box>
    </div>
  );
}

export default App;
