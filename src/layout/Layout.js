import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import moment from 'moment'
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BASE_URL } from "./../baseUrl";

import axios from "axios";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button, Layout, Modal } from 'antd';
import { Notification } from './../helpers/constant'
import { DataContext } from "../context/DataContext";
const drawerWidth = 240;

function LayoutTemplate({ window, component }) {
    const location = useLocation();
    const { fetchUser, setUser, user } = useContext(DataContext)
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [profile, setProfile] = useState('');
    const [role, setRole] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [notificationsCount, setNotificationsCount] = useState(0)
    const [isLoading, setisLoading] = useState(true)
    const [sideBarOptions, setSideBarOptions] = useState(false)



    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = () => {
        localStorage.removeItem('authtoken');
        navigate('/')
    };
    const monthDiff = (date_of_joining) => {

        const past_date = new Date();
        const current_date = new Date(date_of_joining);
        const difference = (past_date.getFullYear() * 12 + past_date.getMonth()) - (current_date.getFullYear() * 12 + current_date.getMonth());
        let months;
        // const months = (difference / 12 | 0) + " years and " + difference % 12 + " months"
        if (difference > 12) {
            months = (difference / 12 | 0) + " years and " + difference % 12 + " months"

        } else {
            months = difference % 12 + " months"
        }

        return months;
    }
    useEffect(() => {
        if (!Object.keys(user) > 0) {
            return
        }
        fetchUser()
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })


    }, [])

    useEffect(() => {
        let role = user?.role
        let routeName = location.pathname
        console.log(routeName)
        if (!role) {
            return
        }
        let drawer = (
            <div>
                {/* <Toolbar /> */}
                <img src="./logo.png" style={{ padding: 10 }} ></img>

                <Divider className='nav_divider text-center' />
                {role == 2 ?
                    routeName == '/dashboardpage' ?
                        <List>


                            <div className='avatar'>
                                <Avatar className='avatar_img' alt={user.name} src={BASE_URL + "/" + user.image} />

                            </div>
                            <div className='profile_name'>
                                <h5 className='mt-4 '>{user.name}</h5>
                                <h5 className='mt-1'>#{user.emp_id}</h5>
                            </div>
                            <div className='profile_details'>


                                <div className='row user_info'>
                                    <p>Designation </p><p className="fade_info">{user.designation}</p>
                                    <p>Email </p><p className="fade_info">{user.email}</p>
                                    <p>Phone No </p><p className="fade_info">{user.phonenumber}</p>
                                    <p>Tenure </p><p className="fade_info">{monthDiff(user.date_of_joining)}</p>
                                    <p>Birthday </p><p className="fade_info">{moment(user.dob).format('DD-MMM-YYYY')}</p>


                                </div>




                            </div>
                            <div className='logout_button mt-4'>
                                <button className='btn btn-primary' onClick={logout}>Logout</button>

                            </div>
                        </List>

                        :
                        <List className='side_links'>

                            {[
                                <Link to="/dashboardpage">Dashboard </Link>,
                                <Link to="/profile">Profile </Link>,
                                <Link to="/leaves">Leave Quota</Link>,
                                <Link to="/applyleave">Apply Leave </Link>,
                                <Link to="/leaverequest">Leave Request</Link>,
                                <Link to="/adduser">Add Employee</Link>,
                                <Link to="/invite">Employee List</Link>,
                                // <Link to="/addproject">Add Project</Link>,

                                // <Link to="/employee_list">Employee Records</Link>,


                            ].map((text, index) => (

                                <ListItemButton key={index}>
                                    <ListItemIcon>

                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>

                            ))}
                        </List>
                    : role == 1 ?

                        <List className='side_links'>
                            {[<Link to="/dashboardpage">Dashboard</Link>, <Link to="/profile" className="header_toggle">Profile</Link>, <Link to="/admin_leave_request">Leave Request</Link>, <Link to="/adduser">Add Employee</Link>, <Link to="/invite">Employee List</Link>,
                                // <Link to="/employee_list">Employee Records</Link>
                            ].map((text, index) => (

                                <ListItemButton key={index}>
                                    <ListItemIcon>

                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>

                            ))}
                        </List>


                        :
                        role == 0 ?

                            <List className='side_links'>
                                {[<Link to="/dashboard">Dashboard</Link>,
                                <Link to="/profile">Profile</Link>,
                                <Link to="/leaves">Leaves</Link>,
                                <Link to="/applyleave">Apply Leave</Link>].map((text, index) => (

                                    <ListItemButton key={index}>
                                        <ListItemIcon>

                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>

                                ))}
                            </List>
                            : <>
                            </>
                }

            </div >
        )
        setSideBarOptions(drawer)
        setisLoading(false)


    }, [user])


    // useEffect(() => {


    //     let authtokens = localStorage.getItem("authtoken");
    //     let token = {
    //         headers: {
    //             token: authtokens,
    //             "Content-Type": "application/json",
    //         },
    //     };
    //     if (!authtokens) {
    //         navigate('/')
    //     }
    //     else {
    //         axios.get(`${BASE_URL}/profile`, token)
    //             .then((res) => {
    //                 console.log(res.data)
    //                 setProfile(res.data)
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }

    // }, [])

    // useEffect(() => {

    //     let authtokens = localStorage.getItem("authtoken");
    //     if (!authtokens) {
    //         navigate('/')
    //     }
    //     else {
    //         let display = {
    //             headers: {
    //                 'token': authtokens,
    //             }
    //         }

    //         axios.get(`${BASE_URL}/all`, display)
    //             .then((res) => {
    //                 setRole(res.data.role)
    //                 console.log(res.data.role, "abcccccc")
    //             })
    //             .catch((err) => {
    //                 console.log(err);

    //             });
    //         axios.get(`${BASE_URL}/get_all_notification`, display)
    //             .then((res) => {
    //                 // setRole(res.data.role)
    //                 console.log(res.data, "All")
    //                 setNotifications(res.data)
    //                 let tempCount = 0
    //                 for (let x of res.data) {
    //                     if (!x.is_read) {
    //                         tempCount++
    //                     }
    //                 }
    //                 setNotificationsCount(tempCount)

    //             })
    //             .catch((err) => {
    //                 console.log(err);

    //             });
    //     };

    // }, [])

    const read_notification = (e, element) => {
        e.preventDefault();
        let authtokens = localStorage.getItem("authtoken");
        if (!authtokens) {
            navigate('/')
        }
        let display = {
            headers: {
                'token': authtokens,
            }
        }
        axios.put(`${BASE_URL}/is_mark_read/${element}`, null, display)
            .then((res) => {
                console.log(res.data)
                if (res.data.redirect) {

                    navigate('/leaverequest')
                    let tmp = [...notifications]
                    var index = tmp.findIndex(p => p._id == element);
                    tmp.splice(index, 1)
                    setNotifications([...tmp])

                } else {
                    navigate('/leaves')
                    let tmp = [...notifications]
                    var index = tmp.findIndex(p => p._id == element);
                    tmp.splice(index, 1)
                    setNotifications([...tmp])


                }
                handleCancel()

            })
            .catch((err) => {
                console.log(err);

            });
    }

    // const drawer = (
    //     <div>
    //         {/* <Toolbar /> */}
    //         <img src="./logo.png" style={{ padding: 10 }} ></img>

    //         <Divider className='nav_divider text-center' />
    //         {role == 2 ?
    //             <List className='side_links'>

    //                 {[
    //                     <Link to="/dashboardpage">Dashboard </Link>,
    //                     <Link to="/profile">Profile </Link>,
    //                     <Link to="/leaves">Leave Quota</Link>,
    //                     <Link to="/applyleave">Apply Leave </Link>,
    //                     <Link to="/leaverequest">Leave Request</Link>,
    //                     <Link to="/adduser">Add Employee</Link>,
    //                     <Link to="/invite">Employee List</Link>,
    //                     // <Link to="/addproject">Add Project</Link>,

    //                     // <Link to="/employee_list">Employee Records</Link>,


    //                 ].map((text, index) => (

    //                     <ListItemButton key={index}>
    //                         <ListItemIcon>

    //                         </ListItemIcon>
    //                         <ListItemText primary={text} />
    //                     </ListItemButton>

    //                 ))}
    //             </List>
    //             : role == 1 ?

    //                 <List className='side_links'>
    //                     {[<Link to="/dashboardpage">Dashboard</Link>, <Link to="/profile" className="header_toggle">Profile</Link>, <Link to="/admin_leave_request">Leave Request</Link>, <Link to="/adduser">Add Employee</Link>, <Link to="/invite">Employee List</Link>,
    //                         // <Link to="/employee_list">Employee Records</Link>
    //                     ].map((text, index) => (

    //                         <ListItemButton key={index}>
    //                             <ListItemIcon>

    //                             </ListItemIcon>
    //                             <ListItemText primary={text} />
    //                         </ListItemButton>

    //                     ))}
    //                 </List>


    //                 :
    //                 role == 0 ?

    //                     <List className='side_links'>
    //                         {[<Link to="/dashboard">Dashboard</Link>,
    //                         <Link to="/profile">Profile</Link>,
    //                         <Link to="/leaves">Leaves</Link>,
    //                         <Link to="/applyleave">Apply Leave</Link>].map((text, index) => (

    //                             <ListItemButton key={index}>
    //                                 <ListItemIcon>

    //                                 </ListItemIcon>
    //                                 <ListItemText primary={text} />
    //                             </ListItemButton>

    //                         ))}
    //                     </List>
    //                     : <>
    //                     </>
    //         }

    //     </div >
    // );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (

        !isLoading &&
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
                    <div className="applyleavedec">
                        <Link to="/applyleave">
                            <img src="apply Leave.svg" ></img>
                            &nbsp;    Apply Leave  &nbsp;
                        </Link>
                        <Badge badgeContent={notifications.length} color="primary">
                            <NotificationsIcon color="white" onClick={showModal} />
                        </Badge>
                        <Modal title="Notifications" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                            {notifications?.map((item, index) => {
                                return <>

                                    <div className={item.is_read ? "notificationCard" : "notificationCard unReadNotification"}>
                                        {/* {item.type == "pending" ? `${item.userId.name} ${Notification['pending']}` : item.type == "approved" ? `` : ``} */}
                                        <p onClick={(e) => { read_notification(e, item._id) }}>{`${item.userId.name} ${Notification[item.type]}`} </p>
                                    </div>
                                </>
                            })}
                            {notifications?.length < 1 ?
                                <>
                                    <div className="noDataFound">No Notification Found</div>
                                </>
                                : ''}


                        </Modal>
                    </div>
                    <div className="avatar_dropdown">
                        <Avatar alt={user?.name} src={BASE_URL + "/" + user?.image} />
                        <div className="employe_info">

                            <p>{user?.name} </p>
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
                    {sideBarOptions}
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
                    {sideBarOptions}
                </Drawer>
            </Box>

        </Box>

    );
}


export default LayoutTemplate;
