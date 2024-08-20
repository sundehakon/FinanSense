import { Box, Typography } from '@mui/material';
import './App.css';
import ChartComponent from './Components/Chart';

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 5, gap: 10 }}>
        <Typography variant='h3'>FinanSense</Typography>
        <ChartComponent />
      </Box>
    </div>
  );
}

export default App;
