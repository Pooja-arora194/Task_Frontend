
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import React, { useState, useEffect, useContext } from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BASE_URL } from "../baseUrl";
import { LoaderContext } from '../App.js'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal, Button, Dropdown, Menu } from 'antd'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTable } from 'react-table'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import LayoutTemplate from "../layout/Layout";
import { ToastContainer, toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { message, Popconfirm } from 'antd';
const tableHead = {
    name: "Name",
    parentId: "Employee Id",
    campaignType: "Email Id",
    status: "Mobile No",
    channel: "Designation",
    action: "Actions"
};



const EmployeeLists = () => {


    const { showLoader, hideLoader } = useContext(LoaderContext)
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [employeelist, setEmployeeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [fillname, setName] = useState('')
    const [fillemail, setEmail] = useState('')
    const [fillphone, setPhone] = useState('')
    const [fillempID, setEmpID] = useState('')
    const [filldesignation, setDesignation] = useState('')
    const [filldob, setDob] = useState(new Date())
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [show, setShow] = useState(false);

    const confirm = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        message.error('Click on No');
    };

    const showModal = () => {

        setIsModalOpen(true);

    }

    const hideButton = () => {
        setShow(true);
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const checkId = (id) => {
        // setEmployeeList(id);
        let filtered_data = employeelist.filter(x => x.id == id)

        filtered_data = filtered_data[0]
        console.log(filtered_data, "filtered_datafiltered_data")
        setName(filtered_data.name)
        setEmail(filtered_data.email)
        setDesignation(filtered_data.designation)
        // setDob(filtered_data.dob)
        setPhone(filtered_data.phonenumber)
        setEmpID(filtered_data.emp_id)


        setUserId(id)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const EmployeeList = () => {
        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",
            },
        };

        axios.get(`${BASE_URL}/employee_list`, token)
            .then((res) => {
                setEmployeeList(res.data)
                setCollection(res.data)

            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {

                hideLoader()
            })
    }
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 25,
        height: 25,
        border: `2px solid ${theme.palette.background.paper}`,
    }));


    const countPerPage = 100;
    const [value, setValue] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [collection, setCollection] = React.useState(
        cloneDeep(employeelist.slice(0, countPerPage))
    );
    const searchData = React.useRef(
        throttle(val => {
            const query = val.toLowerCase();
            setCurrentPage(1);
            const data = cloneDeep(
                employeelist
                    .filter(item => item.name.toLowerCase().indexOf(query) > -1)
                    .slice(0, countPerPage)
            );
            setCollection(data);
        }, 400)
    );

    React.useEffect(() => {
        if (!value) {
            updatePage(1);
        } else {
            searchData.current(value);
        }
    }, [value]);


    const updatePage = (p) => {


        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(cloneDeep(employeelist.slice(from, to)));
        // console.log(employeelist.slice(from, to), "po")
    };


    useEffect(() => {
        showLoader()

        EmployeeList()
    }, [])

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        // const columnData = tableCell.map((keyD, i) => {
        //   return <td key={i}>{key[keyD]}</td>;

        // });

        // return <tr key={index}>{columnData}</tr>;
    };

    // const tableData = () => {
    //   return collection.map((key, index) => tableRows({ key, index }));
    // };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
            <td key={index} className="pt-3 "><b>{title}</b></td>
        ));
    };

    const remove_emp = (e, id) => {
        e.preventDefault();
        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",

            },
        };

        console.log(id, "asd")
        axios.put(`${BASE_URL}/employee_remove/${id}`, {}, token)
            .then((res) => {
                console.log(res.data, "employee_list")
                EmployeeList()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const update_profile = async (req, res) => {


        let authtokens = localStorage.getItem('authtoken');

        let token = {
            headers: {
                'token': authtokens,

            }
        };

        const name = fillname;
        const email = fillemail;
        const designation = filldesignation;
        const phonenumber = fillphone;
        const dob = filldob;
        const emp_id = fillempID;

        axios.put(`${BASE_URL}/update_all_profile/${userId}`, { name: fillname, email: fillemail, phonenumber: fillphone, designation: filldesignation, dob: filldob, emp_id: fillempID }, token)

            .then((res) => {

                setName(res.data.data.name)
                setEmail(res.data.data.email)
                setDesignation(res.data.data.designation)
                setDob(res.data.data.dob)
                setPhone(res.data.data.phonenumber)
                setEmpID(res.data.data.emp_id)
                setIsModalOpen(false);

            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                EmployeeList();
                handleOk()
                hideLoader()
            })

    }

    console.log(fillname, "fillname")


    return (
        <>
            <LayoutTemplate>

                <div className="container Emp_list">
                    <h5>Employee List</h5>
                    <div className="row filter mt-4">

                        <div className="search-box col-md-5">

                            <input type="text" name="search" className="form-control search-input" placeholder="Search By Name" />

                        </div>
                        <div className="designation-box col-md-3">
                            <select className="form-control designation-box" name="designation"
                            >
                                <option selected>Select Designation</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="Php Developer">Php Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="SEO">SEO</option>
                                <option value="BDE">BDE</option>
                                <option value="HR">HR</option>
                                <option value="other">Other</option>

                            </select>
                        </div>
                        <div className="search-btn-box col-md-3">
                            <button className="btn btn-default search-btn-box">Search</button>
                        </div>
                    </div>

                    <div className="row container">
                        <table className="container">
                            <thead>
                                <tr>{headRow()}</tr>
                            </thead>
                            <tbody>
                                {
                                    collection?.map((item, i) => {
                                        return (
                                            <>
                                                <tr
                                                >
                                                    <td>{item?.name}</td>
                                                    <td>{item?.emp_id}</td>
                                                    <td>{item?.email}</td>
                                                    <td>{item?.phonenumber}</td>
                                                    <td>{item?.designation}</td>

                                                    <td> <Dropdown
                                                        overlay={(
                                                            <Menu>
                                                                <Menu.Item key="0" onClick={showModal}>
                                                                    <EditOutlinedIcon />
                                                                    Edit

                                                                </Menu.Item>
                                                                <Menu.Item key="1" >
                                                                    <Popconfirm
                                                                        title="Delete the record"
                                                                        description="Are you sure to delete this record?"
                                                                        onConfirm={confirm}
                                                                        onCancel={cancel}
                                                                        okText="Yes"
                                                                        cancelText="No"
                                                                    >
                                                                        <DeleteOutlineIcon />Delete
                                                                    </Popconfirm>
                                                                </Menu.Item>
                                                            </Menu>
                                                        )}
                                                        trigger={['click']}>
                                                        <a className="ant-dropdown-link"
                                                            onClick={e => e.preventDefault()}>
                                                            <MoreVertIcon onClick={(e) => { checkId(item._id) }} />

                                                        </a>
                                                    </Dropdown>
                                                    </td>
                                                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}

                                                        footer={[
                                                            <button className="Save_changes btn btn-primary" value="submit" onClick={update_profile} >Save Changes

                                                            </button>
                                                        ]} >


                                                        <Modal
                                                            open={open}
                                                            title="Image"

                                                            footer={[

                                                                <Button key="submit" type="primary"  >
                                                                    Submit
                                                                </Button>,

                                                            ]}
                                                        >
                                                            <input type="file" name="image"
                                                            />

                                                        </Modal>
                                                        <div className="row mt-4" >
                                                            <div className="col-md-6 border_div">
                                                                <label className="addUserLabel">Name</label><br />
                                                                <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={fillname} />


                                                            </div>
                                                            <div className="col-md-6 border_div">
                                                                <label className="addUserLabel">Employee ID</label><br />
                                                                <input type="text" name="employeeid" onChange={(e) => setEmpID(e.target.value)} value={fillempID} />


                                                            </div>


                                                        </div>
                                                        <div className="row mt-4" >
                                                            <div className="col-md-6 border_div">
                                                                <label className="addUserLabel">Email</label><br />
                                                                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={fillemail} />


                                                            </div>
                                                            <div className="col-md-6 border_div">
                                                                <label className="addUserLabel">Phonenumber</label><br />
                                                                <input type="text" name="phonenumber" onChange={(e) => setPhone(e.target.value)} value={fillphone} />


                                                            </div>


                                                        </div>
                                                        <div className="row mt-4" >
                                                            <div className="col-md-6 border_div">
                                                                <label className="addUserLabel">Position</label><br />
                                                                <input type="text" name="position" onChange={(e) => setDesignation(e.target.value)} value={filldesignation} />


                                                            </div>
                                                            <div className="col-md-6 border_div">
                                                                <label className="addUserLabel">Birthday</label><br />
                                                                <input type="text" name="birthday" value={new Date(filldob)?.toISOString()?.split('T')[0]} onChange={(e) => setDob(e.target.value)} />


                                                            </div>


                                                        </div>

                                                    </Modal>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        pageSize={countPerPage}
                        onChange={updatePage}
                        current={currentPage}
                        total={employeelist.length}
                    />
                </div>

            </LayoutTemplate>
        </>
    );
};
export default EmployeeLists;



