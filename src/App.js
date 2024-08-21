import { Box, Typography, IconButton } from '@mui/material';
import './App.css';
import ChartComponent from './Components/Chart';
import Add from './Components/Add';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 5 }}>
        <Typography variant='h3'>FinanSense™</Typography>
        <Typography sx={{ color: 'grey' }} variant='caption'>Designed and built by Håkon Sunde</Typography>
        <Box sx={{ display: 'flex', marginBottom: 6 }}>
          <IconButton href='https://x.com/lordsunde' target='_blank' disableRipple sx={{ backgroundColor: 'transparent' }}>
            <TwitterIcon />
          </IconButton>
          <IconButton href='https://www.instagram.com/sunde.hakon/' target='_blank' disableRipple sx={{ backgroundColor: 'transparent' }}>
            <InstagramIcon />
          </IconButton>
          <IconButton href='https://github.com/sundehakon' target='_blank' disableRipple sx={{ backgroundColor: 'transparent' }}>
            <GitHubIcon />
          </IconButton>
        </Box>
        <Add />
        <ChartComponent />
      </Box>
    </div>
  );
}

export default App;
