import React, { useEffect, useState, useContext } from 'react';
import Header from '../utils/header';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { theme, Badge } from 'antd';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarMode } from 'antd/es/calendar/generateCalendar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BASE_URL } from '../../baseUrl';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoaderContext } from '../../App.js'
import moment from 'moment'
import LayoutTemplate from '../../layout/Layout';
function Leaves() {
    const { showLoader, hideLoader } = useContext(LoaderContext)


    const navigate = useNavigate();
    const [leavevalue, setLeaveValue] = useState([]);

    const [sickLeaves, setSickLeaves] = useState([])
    const [earnedLeaves, setEarnedLeaves] = useState([])
    const [casualLeaves, setCasualLeaves] = useState([])
    const { token } = theme.useToken();

    const onPanelChange = (value, mode) => {
        console.log(value, mode)
    };

    const wrapperStyle = {
        // width: "90%",
        // border: `1px solid ${token.colorBorderSecondary}`,
        // borderRadius: token.borderRadiusLG,
    };

    // function onFullRender(date) {
    //     const day = date.date();
    //     let style;
    //     if (day === 1) {
    //         style = { border: "1px solid #d9d9d9" };
    //     }
    //     else {
    //         style = { border: "1px solid red" };
    //     }
    //     return <div style={style}>{day}</div>;
    // }
    useEffect(() => {
        let tmp = [...leavevalue]
        let sick = []
        let casual = []
        let earn = []
        for (let x of tmp) {
            if (x.leave == 'Casual Leave') {
                sick.push(x.from_date)
            }
            if (x.leave == 'Sick Leave') {
                casual.push(x.from_date)
            }
            if (x.leave == 'Earned Leave') {
                earn.push(x.from_date)
            }
        }
        setCasualLeaves([...casual])
        setEarnedLeaves([...earn])
        setSickLeaves([...sick])
        console.log(casual, earn, sick, "flow")
    }, [leavevalue])



    useEffect(() => {

        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",

            },
        };

        if (!authtokens) {
            navigate('/')
        }
        else {
            showLoader()

            axios.get(`${BASE_URL}/single_user_apply_leave`, token)
                .then((res) => {
                    setLeaveValue(res.data)
                })
                .catch((err) => {
                    console.log(err);
                }).finally(() => {

                    hideLoader()
                })
        }

    }, [])



    return (
        <LayoutTemplate>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='col-md-10'>
                        <h4 className='page-heading'>Leave Quota</h4>

                    </div>

                    <div className='col-md-2'>
                        <Link to="/applyleave">
                            <button className='apply-leave-btn'>Apply Leaves</button>
                        </Link>
                    </div>

                </div>
                <div className='row mt-4'>
                    <div className='col-md-6'>
                        <div className="calender">
                            <h5 className='text-start'>Calendar</h5>
                            <div style={wrapperStyle} className="mt-4" >

                                <Calendar
                                        // dateCellRender={dateCellRender}
                                        // monthCellRender={monthCellRender}
                                        fullscreen={false}
                                        onPanelChange={onPanelChange}
                                        // dateFullCellRender={onFullRender}
                                    />
                                {/* <Calendar
                                   
                                /> */}

                            </div>

                        </div>
                    </div>
                    <div className='col-md-6 mt-4'>
                        <div className='leave_request'>
                            <h5>Leave Requests</h5>
                            <table class="table mt-4">

                                <tbody>
                                    {
                                        leavevalue?.length > 0 ?
                                            leavevalue.map((element, index) => {
                                                return (
                                                    <>

                                                        <tr className='mt-4'>
                                                            <td>  {element.leave}</td>
                                                            <td>  {moment(element.from_date).format('DD MMM YYYY')} - {moment(element.to_date).format('DD MMM YYYY')}</td>

                                                            <td style={{ fontWeight: 600 }} className={element.status == 'pending' ? 'pending-text' : element.status == 'approved' ? 'approved-text' : 'rejected-text'}>  {element.status}</td>
                                                        </tr>

                                                    </>
                                                )
                                            })
                                            :
                                            <>
                                                <tr><td colspan="8"><h5 className="leave_no_found">No Record Found</h5></td></tr>
                                            </>

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutTemplate>
    )
}
export default Leaves