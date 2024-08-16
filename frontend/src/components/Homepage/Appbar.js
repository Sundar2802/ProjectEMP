import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, IconButton,
  Menu,
  MenuItem, } from '@mui/material';
import './Appbar.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { usercontext } from '../Usercontext';


const Appbar = () => {
  const navigate=useNavigate();
  const[user,setuser]=useContext(usercontext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const HandleSettings = () => {
    if(user.role==='student'){
      navigate("/profileSettings")
    }
  }
  const handleClose = () => {
    setAnchorEl(null);
  };  
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear()
    setuser(null);
    navigate("/");
  };
  return (
    <div>
    <AppBar position="fixed" className="app-bar" style={{backgroundColor:'primary.main'}}> 
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            EduManage
          </Typography>
          {!user?.name ? (
            <>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">Home</Button>
              </Link>
              <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to='/register' style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <Box display={'flex'} alignItems={'center'}>
              <Typography variant='h6' paddingRight={'10px'} color={'white'}>{user.name}</Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: '40px' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={HandleSettings}>Profile Setting</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <Outlet/>
      </main>

      </div>
  )
}
export default Appbar;