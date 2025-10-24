import React, { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Avatar, 
    Menu, 
    MenuItem, 
    IconButton,
    Box,
    Divider
} from '@mui/material';
import { 
    Person as PersonIcon, 
    Logout as LogoutIcon,
    Home as HomeIcon,
    History as HistoryIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    const handleHome = () => {
        navigate('/home');
        handleClose();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleClose();
    };

    return (
        <AppBar position="static" sx={{ bgcolor:'#f6f6daff', boxShadow: 2,}}>
         
         <Toolbar sx={{justifyContent: 'flex-end' }}>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar sx={{ bgcolor: '#8BC34A', width: 32, height: 32 }}>
                            {(user?.name || 'Peter').charAt(0)}
                        </Avatar>
                    </IconButton>
                    
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{ mt: 1 }}
                    >
                        <MenuItem onClick={handleHome}>
                            <HomeIcon sx={{ mr: 2 }} />
                            Home
                        </MenuItem>
                        <MenuItem onClick={handleProfile}>
                            <PersonIcon sx={{ mr: 2 }} />
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/history')}>
                            <HistoryIcon sx={{ mr: 2 }} />
                            Prescription History
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <LogoutIcon sx={{ mr: 2 }} />
                            Logout
                        </MenuItem>
                    </Menu>
         </Toolbar>
        </AppBar>
    );
};

export default Header;
