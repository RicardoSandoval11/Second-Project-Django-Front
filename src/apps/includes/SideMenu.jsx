import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { MenuOutlined } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import DatasetIcon from '@mui/icons-material/Dataset';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../../hooks/useAuthStore';
import { LogoutOutlined, LoginOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { status } = useSelector(state => state.auth);

    const { startLogout } = useAuthStore();

    const navigate = useNavigate();

    // Menu links
    const redirectMyEntries = () => {
      navigate('/entries/my-entries');
    }

    const redirectMyfavorites = () => {
      navigate('/favorites/my-favorites');
    }

    const redirectAllCategories = () => {
      navigate('/categories/list-all');
    }

    const redirectAllEntriesPage = () => {
      navigate('/entries/list-all');
    }

    const redirectLogin = () => {
        navigate('/auth/login');
    }

    const redirectMyAccount = () => {
      navigate('/my-dashboard');
    }
    
    const onLogout = () => {
        startLogout();
    }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {
        status == 'authenticated' ?
          <>
          <List>
              <ListItem key={'my-entries'} disablePadding>
                <ListItemButton onClick={redirectMyEntries}>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary={'My Entries'}/>
                </ListItemButton>
              </ListItem>
              <ListItem key={'favorites'} disablePadding>
                <ListItemButton onClick={redirectMyfavorites}>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Favorites'} />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          </>
        :
          <></>  
      }
      <List>
          <ListItem key={'all-categories'} disablePadding>
            <ListItemButton onClick={redirectAllCategories}>
              <ListItemIcon>
                <BorderAllIcon />
              </ListItemIcon>
              <ListItemText primary={'All Categories'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'all-entries'} disablePadding>
            <ListItemButton onClick={redirectAllEntriesPage}>
              <ListItemIcon>
                <DatasetIcon />
              </ListItemIcon>
              <ListItemText primary={'All Entries'} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      {
        status == 'authenticated' ?
          <List>
              <ListItem key={'my-account'} disablePadding>
                <ListItemButton onClick={redirectMyAccount}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={'My Account'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={'logout'} disablePadding>
                <ListItemButton
                  onClick={onLogout}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Logout'} />
                </ListItemButton>
              </ListItem>
          </List>
        :
          <List>
            <ListItem key={'login'} disablePadding>
              <ListItemButton
                onClick={redirectLogin}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={'Login'} />
              </ListItemButton>
            </ListItem>
          </List>
      }
    </Box>
  );

  return (
    <>
        <Button 
            onClick={toggleDrawer('left', true)}
            sx={{color:'white'}}
        >
                <MenuOutlined/>
        </Button>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
    </>    
  );
}