import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate } from 'react-router-dom';
import { BASE_URL } from "../../baseUrl";
import Dashboard from '../../components/dashboard';
import Profile from '../UserDashboard/profile';
import Setting from '../../components/setting';
import axios from "axios";

const drawerWidth = 240;

function Header({ window, component }) {


    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [profile, setProfile] = useState('');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const logout = () => {
        localStorage.removeItem('authtoken');

        Navigate('/login')
    };


    useEffect(() => {


        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",
            },
        };
        if (!authtokens) {
            Navigate('/login')
        }
        else {
            axios.get(`${BASE_URL}/profile`, token)
                .then((res) => {
                    console.log(res.data)
                    setProfile(res.data)


                })
                .catch((err) => {
                    console.log(err);
                });
        }



    }, [])
    const drawer = (
        <div>
            <Toolbar />
            <img src="logo.png" className='center'></img>
            <Divider className='nav_divider text-center' />
            <List className='side_links'>

                {[
                    <Link to="/dashboard">Dashboard </Link>,
                    <Link to="/profile">Profile </Link>,

                    // <Link to="/team">Team </Link>,
                    <Link to="/leaves">Leave Quota</Link>, ,
                    <Link to="/applyleave">Apply Leave </Link>,].map((text, index) => (

                        <ListItemButton>
                            <ListItemIcon>

                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>

                    ))}
            </List>


        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar
                    className='main_header1'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">

                    </Typography>
                    <Link to="/applyleave">
                        <img src="apply Leave.svg" ></img> </Link>
                    &nbsp;    Apply Leave  &nbsp; <img src="Vector.svg" ></img>

                    <div className="avatar_dropdown">
                        <Avatar alt="Remy Sharp" src={profile.image} />
                        <div className="employe_info">

                            <p>{profile.name} </p>
                        </div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select">
                                    <MenuItem value={10}>
                                        <Link to="/profile">Profile</Link></MenuItem>

                                    <MenuItem value={20} onClick={logout}>Logout</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                className='allNav'

                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    className='allNav'

                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    className='allNav'

                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open

                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {/* {<props.component />} */}
                {/* {component} */}
                {/* <Toolbar /> */}

            </Box>
        </Box>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Header;
