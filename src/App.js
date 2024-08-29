import { Box, Typography, IconButton, ButtonGroup, Button } from '@mui/material';
import './App.css';
import ChartComponent from './Components/Chart';
import Add from './Components/Add';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import View from './Components/View';

function App() {
  const [showComponent, setShowComponent] = useState('add');
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
          <IconButton href='https://sundehakon.tech/' target='_blank' disableRipple sx={{ backgroundColor: 'transparent' }}>
            <LanguageIcon />
          </IconButton>
        </Box>
        <ButtonGroup variant='contained'>
          <Button>Add Expenses</Button>
          <Button>View Expenses</Button>
        </ButtonGroup>
        {showComponent
          <Add />
        }
        <View />
        <ChartComponent />
      </Box>
    </div>
  );
}

export default App;
