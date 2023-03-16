import React, { useState, useEffect, useContext } from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BASE_URL } from "../baseUrl";
import { LoaderContext } from '../App.js'
import LayoutTemplate from "../layout/Layout";



const drawerWidth = 250;

const EmployeeLists = () => {
    const { showLoader, hideLoader } = useContext(LoaderContext)
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [employeelist, setEmployeeList] = useState([]);



    const columns = [
        {
            name: <b>Name</b>,
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: <b>Emp Id</b>,
            selector: (row) => row.emp_id,
            sortable: true,
        },
        {
            name: <b>Email</b>,
            selector: (row) => row.email,
        },
        {
            name: <b>Phone</b>,
            selector: (row) => row.phonenumber,
        },
        {
            name: <b>Remove Emp</b>,
            cell: (row) =>
                <>
                    <button className="remove-btn" onClick={(e) => { remove_emp(e, row.id) }}>Remove</button>
                </>

        },


    ]

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

                setFiltered(res.data)
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {

                hideLoader()
            })
    }
    useEffect(() => {
        showLoader()

        EmployeeList()
    }, [])


    const remove_emp = (e, id) => {

        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",

            },
        };

        e.preventDefault();
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


    useEffect(() => {
        const result = employeelist.filter((table) => {
            return table.name.toLowerCase().match(search.toLowerCase());
        });
        setFiltered(result)
    }, [search])


    return (
        <LayoutTemplate>
            <div className="container">
                <h5>Employee List</h5>
                <DataTable columns={columns} data={filtered} pagination fixedHeader fixedHeaderScrollHeight='600px'
                    selectableRowsHighlight highlightOnHover
                    subHeader
                    subHeaderAlign='right'
                    subHeaderComponent={
                        <input type="text"
                            placeholder='Search here'
                            className='w-25 form-control'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    }></DataTable>
            </div>

        </LayoutTemplate>

    )
}
export default EmployeeLists;