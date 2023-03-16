import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Table } from 'antd';
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
    const [pendingLeave, setPendingLeave] = useState({});
    const columns = [

        {
            title: 'Leave',
            dataIndex: 'leave',
            key: 'leave',
        },
        {
            title: 'Date From',
            // dataIndex: 'from_date',
            render: (_, record) => (
                moment(record.from_date).format('DD MMM YYYY')
            ),
            key: 'from_date',
        },

        {
            title: 'Date To',
            key: 'to_date',
            render: (_, record) => (
                moment(record?.to_date).isValid() ?
                    <>
                        {moment(record?.to_date).format('DD MMM YYYY')}
                    </>
                    :
                    <>
                        N/A
                    </>
            ),
        },
        {
            title: 'Applied On',
            key: 'createdAt',
            render: (_, record) => (
                moment(record?.createdAt).isValid() ?
                    <>
                        {moment(record?.createdAt).format('DD MMM YYYY')}
                    </>
                    :
                    <>
                        N/A
                    </>
            ),
        },

        {
            title: 'Days',
            key: 'leave_type',
            render: (_, record) => (

                moment(record?.to_date).diff(moment(record?.from_date), 'days') + 1 > 0 ?
                    <>{moment(record?.to_date).diff(moment(record?.from_date), 'days') + 1 + " Days"}</>
                    :
                    <>Half Day</>
            ),
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (

                <b style={{ fontWeight: 600 }} className={record.status == 'pending' ? 'pending-text' : record.status == 'approved' ? 'approved-text' : 'rejected-text'}>  {record.status}</b>
            ),
        },


    ];
    const returnTwo = (value) => {
        if (parseInt(value) < 10 && parseInt(value) > 1) {
            return `0${value}`
        }
        return value
    }

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
                    axios.get(`${BASE_URL}/profile`, token)
                        .then((res) => {
                            setPendingLeave(res.data)
                        })
                        .catch((err) => {
                            console.log(err);
                        })
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
                <div className='row'>
                    <div className='col-md-10'>
                        <h4 className='page-heading'>Leave Quota</h4>
                    </div>
                    <div className='col-md-2'>
                        <Link to="/applyleave">
                            <button className='apply-leave-btn'>Apply Leaves</button>
                        </Link>
                    </div>
                </div>
                <div className="row avail-leaves-card-row ">
                    <div className="col-md-4">
                        <div className=" avail-leaves-card">
                            <div className="count earn-leave-count"> {returnTwo(pendingLeave?.leave?.earned_leave > 0 ? pendingLeave.leave?.earned_leave : 0)}</div>
                            <div className="heading">Earned Leaves Available</div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className=" avail-leaves-card">
                            <div className="count sick-leave-count"> {returnTwo(pendingLeave?.leave?.sick_leave >= 0 ? pendingLeave.leave?.sick_leave : 0)}</div>
                            <div className="heading">Sick Leaves Available</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className=" avail-leaves-card">
                            <div className="count casual-leave-count">  {returnTwo(pendingLeave?.leave?.casual_leave >= 0 ? pendingLeave.leave?.casual_leave : 0)}</div>
                            <div className="heading">Casual Leaves Available</div>
                        </div>
                    </div>


                </div>
                <div className='row mt-4'>
                    <div className='col-md-12'>
                        <div className='leave_request'>
                            <h5>Leave Requests</h5>
                            <Table
                                columns={columns}
                                dataSource={leavevalue}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </LayoutTemplate>
    )
}
export default Leaves