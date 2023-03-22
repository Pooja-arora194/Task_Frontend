import React, { Children, useContext, useEffect, useState } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
const drawerWidth = 300;

function LayoutTemplate({ children }) {
    const location = useLocation();
    const { fetchUser, setUser, user, fetchAllNotification, notifications, setNotifications, timeLog } = useContext(DataContext)
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [profile, setProfile] = useState('');
    const [role, setRole] = useState(false)
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
    const CheckInFun = () => {
        timeLog()
            .then((res) => {
                console.log(res)
                toast.success("Successfully Checked in")
                fetchUser()
            })
            .catch((e) => {
                console.log(e)
                toast.error("Something went wrong")
            })
    }


    const monthDiff = (date_of_joining) => {

        const past_date = new Date();
        const current_date = new Date(date_of_joining);
        const difference = (past_date.getFullYear() * 12 + past_date.getMonth()) - (current_date.getFullYear() * 12 + current_date.getMonth());
        let months;
        // const months = (difference / 12 | 0) + " years and " + difference % 12 + " months"
        if (difference > 12) {
            return (
                months = (difference / 12 | 0) + " years and " + difference % 12 + " months"
            )
        } else if (difference < 0) {
            return (
                months = 0 + " months"
            )
        } else {
            return (
                months = difference % 12 + " months"
            )
        }

        return months;
    }
    useEffect(() => {
        if (Object.keys(user).length > 0) {
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
        console.log(user, 'context')
        let role = user?.role
        let routeName = location.pathname
        console.log(routeName, 'flow1', role)
        if (role == undefined) {
            return
        }
        let drawer = (
            <div>
                {/* <Toolbar /> */}
                <img src="./logo.png" style={{ padding: 30 }} ></img>
                {/* <Divider className='nav_divider text-center' /> */}

                {role == 2 ?

                    <List>
                        <div className='avatar'>
                            <Avatar className='avatar_img' alt={user.name} src={BASE_URL + "/" + user.image} />

                        </div>
                        <div className='profile_name'>
                            <h5 className='mt-4 '>{user.name}</h5>
                            <p className='mt-3'>#{user.emp_id}</p>
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
                        {
                            !user.timeLog?.checkInFlag ?
                                <>
                                    <div className="mt-4">
                                        <button className="Check-In-Btn"
                                            onClick={CheckInFun}
                                        ><span>Check In</span>
                                            <img src="./checkInicon.svg"
                                                style={{
                                                    paddingLeft: 10
                                                }}
                                            />
                                        </button>
                                    </div>
                                </>
                                :
                                user.timeLog?.checkInFlag && !user.timeLog?.checkOutFlag ?
                                    <>YYYY-MM-DD HH:mm:ss
                                        <p className="mt-2 mb-2 time-log-show">Checked in At : {moment(user.timeLog?.checkIn).format('YYYY-MM-DD HH:mm:ss')}</p>
                                        <div className="mt-4">
                                            <button className="Check-Out-Btn"
                                                onClick={CheckInFun}
                                            ><span>Check Out</span>
                                                <img src="./checkOuticon.svg"
                                                    style={{
                                                        paddingLeft: 10
                                                    }}
                                                />
                                            </button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <p className="mt-2 mb-2 time-log-show">Checked In At : {moment(user.timeLog?.checkIn).format('YYYY-MM-DD HH:mm:ss')}</p>
                                        <p className="mt-2 mb-2 time-log-show">Checked Out At : {moment(user.timeLog?.checkOut).format('YYYY-MM-DD HH:mm:ss')}</p>
                                    </>
                        }

                        {/* <div className="mt-4">
                            <button className="Check-Out-Btn"
                                onClick={CheckInFun}
                            ><span>Check Out</span>
                                <img src="./checkOuticon.svg"
                                    style={{
                                        paddingLeft: 10
                                    }}
                                />
                            </button>
                        </div> */}
                        <div className='logout_button mt-4'>
                            <Link to='/leaverequest'><button className='leave-request-btn' >Leave Request</button></Link>

                        </div>
                    </List>


                    : role == 1 ?

                        <List>
                            <div className='avatar'>
                                <Avatar className='avatar_img' alt={user.name} src={BASE_URL + "/" + user.image} />

                            </div>
                            <div className='profile_name'>
                                <h5 className='mt-4 '>{user.name}</h5>
                                {/* <h5 className='mt-1'>#{user.emp_id}</h5> */}
                            </div>
                            <div className='profile_details'>


                                <div className='row user_info'>
                                    <p>Designation </p><p className="fade_info">{user.designation}</p>
                                    <p>Email </p><p className="fade_info">{user.email}</p>
                                    {/* <p>Phone No </p><p className="fade_info">{user.phonenumber}</p> */}
                                    {/* <p>Tenure </p><p className="fade_info">{monthDiff(user.date_of_joining)}</p> */}
                                    {/* <p>Birthday </p><p className="fade_info">{moment(user.dob).format('DD-MMM-YYYY')}</p> */}
                                </div>
                            </div>
                            <div className='logout_button mt-4'>
                                <Link to='/leaverequest'><button className='leave-request-btn' >Leave Request</button></Link>
                            </div>
                        </List>





                        :
                        role == 0 ?
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
                                    {user?.profile == 'team_leader' ?
                                        <Link to='/leaverequest'><button className='leave-request-btn' >Leave Request</button></Link>
                                        :
                                        <button className='btn btn-primary' onClick={logout}>Logout</button>

                                    }

                                </div>
                            </List>
                            : <>
                            </>
                }

            </div >
        )
        setSideBarOptions(drawer)
        let redirectFlag = false
        if ((role == 0 && routeName == '/adduser') || (role == 0 && routeName == '/leaverequest' && user.profile != 'team_leader')) {
            redirectFlag = true
        }
        if (user?.profile == 'team_leader' && routeName == '/adduser') {
            redirectFlag = true
        }
        if ((role == 1) && (routeName == '/applyleave' || routeName == '/leaves')) {
            redirectFlag = true
        }
        if (redirectFlag) {
            navigate('/401')
        }
        setisLoading(false)


    }, [user, location])




    useEffect(() => {
        fetchAllNotification()
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {

            })
    }, [])

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


    // const container = window !== undefined ? () => window().document.body : undefined;

    return (


        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    padding: { sm: '5px' },
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

                    <div className="row">
                        <div className="applyleavedec col-7">

                            <Link to="/applyleave">
                                <div className="apply-leave-header-btn"><span>Apply Leave</span><img style={{ width: 20 }} src="./apply-leave-icon.png" /></div>
                            </Link>
                            <Badge badgeContent={notifications.length} color="primary">
                                {/* <NotificationsIcon color="white" onClick={showModal} /> */}
                                <img src='./notificationIcon.png' onClick={showModal} style={{ paddingLeft: 15 }} />
                            </Badge>
                            <Modal title="Notifications" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                {notifications?.map((item, index) => {
                                    return <>

                                        <div className={item.is_read ? "notificationCard" : "notificationCard unReadNotification"}>
                                            {/* {item.type == "pending" ? `${item.userId.name} ${Notification['pending']}` : item.type == "approved" ? `` : ``} */}
                                            <p onClick={(e) => { read_notification(e, item._id) }}>{`${item?.userId?.name} ${Notification[item.type]}`} </p>
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
                        <div className="avatar_dropdown col-4">
                            <Avatar alt={user?.name} src={BASE_URL + "/" + user?.image} />
                            <div className="employe_info">

                                <p>{user?.name} </p>
                            </div>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        inputProps={{
                                            MenuProps: {
                                                MenuListProps: {
                                                    sx: {
                                                        backgroundColor: '#000C16',
                                                        color: "#FFF"
                                                    }
                                                }
                                            }
                                        }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    >
                                        {user.role == 0 ?
                                            <>
                                                <MenuItem value={10}> <Link to="/dashboardpage">Dashboard</Link></MenuItem>
                                                <MenuItem value={10}> <Link to="/leaves">Leave Quota</Link></MenuItem>
                                                {user.profile == 'team_leader' && <MenuItem value={10}> <Link to="/leaverequest">Leave Request</Link></MenuItem>}
                                                <MenuItem value={10}> <Link to="/profile">My Profile</Link></MenuItem>
                                                <MenuItem value={20} onClick={logout}>Logout</MenuItem>
                                            </>
                                            :
                                            <>
                                                {user.role == 1 || user.role == 2 ?
                                                    <>
                                                        <MenuItem value={10}> <Link to="/dashboardpage">Dashboard</Link></MenuItem>
                                                        {user.role == 2 && <MenuItem value={10}> <Link to="/leaves">Leave Quota</Link></MenuItem>}
                                                        <MenuItem value={10}> <Link to="/profile">My Profile</Link></MenuItem>
                                                        <MenuItem value={10}> <Link to="/adduser">Add Employee</Link></MenuItem>
                                                        <MenuItem value={10}> <Link to="/employee_list">Employee List</Link></MenuItem>
                                                        <MenuItem value={10}> <Link to="/leaverequest">Leave Requests</Link></MenuItem>
                                                        <MenuItem value={20} onClick={logout}>Logout</MenuItem>
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                                }
                                            </>
                                        }
                                        {/* <MenuItem value={10}>
                                            <Link to="/profile">Profile</Link></MenuItem>

                                        <MenuItem value={20} onClick={logout}>Logout</MenuItem> */}

                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
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
                    // container={container}
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
            <div className="static_width layout">
                {!isLoading && children}
            </div>

        </Box>

    );
}


export default LayoutTemplate;
