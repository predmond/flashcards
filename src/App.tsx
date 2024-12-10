import { useState } from 'react';
import './App.css';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import useKeypress from 'react-use-keypress';
import SettingsIcon from '@mui/icons-material/Settings';
import { WORD_CATEGORIES } from './words';

function App() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const settingsOpen = Boolean(settingsAnchorEl);
  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleCloseSettings = () => {
    setSettingsAnchorEl(null);
  };

  const category = WORD_CATEGORIES[categoryIndex];
  const words = category.words;

  const increment = (value: number) => (value < words.length - 1 ? value + 1 : 0);
  const decrement = (value: number) => (value > 0 ? value - 1 : words.length - 1);

  useKeypress('ArrowRight', () => setIndex((index) => increment(index)));
  useKeypress('ArrowLeft', () => setIndex((index) => decrement(index)));

  return (
    <>
      <Card sx={{ minWidth: '40vw' }}>
        <CardHeader
          title={`${category.name} words ${index + 1} / ${words.length}`}
          action={
            <IconButton onClick={handleClickSettings}>
              <SettingsIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ marginY: 5 }}>
          <Typography fontSize={{ xs: 15, sm: 20, md: 40, lg: 40 }}>{words[index]}</Typography>
        </CardContent>
        <CardActions>
          <Stack direction={'row'} sx={{ justifyContent: 'space-evenly', width: '100%' }} spacing={2}>
            <Button variant="contained" color="primary" sx={{ width: '10em' }} onClick={() => setIndex((index) => decrement(index))}>
              Previous
            </Button>
            <Button variant="contained" color="primary" sx={{ width: '10em' }} onClick={() => setIndex((index) => increment(index))}>
              Next
            </Button>
          </Stack>
        </CardActions>
      </Card>
      <Menu
        id="settings-menu"
        anchorEl={settingsAnchorEl}
        open={settingsOpen}
        onClose={handleCloseSettings}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {WORD_CATEGORIES.map((category, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setCategoryIndex(i);
              setIndex(0);
              handleCloseSettings();
            }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default App;
