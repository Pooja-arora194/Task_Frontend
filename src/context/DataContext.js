import React, { createContext, useState, useEffect } from 'react'
import { BASE_URL } from '../baseUrl'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';


export const DataContext = createContext(null)

export default function DataContextProvider({ children }) {
    const [user, setuser] = useState({})
    const [token, setToken] = useState('')
    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let token = localStorage.getItem('authtoken')
        if (token) {
            setToken(token)
        }
        setIsLoading(false)
    }, [])

    async function fetchUser() {
        debugger
        return new Promise((resolve, reject) => {
            let authtokens = localStorage.getItem("authtoken")
            let token = {
                headers: {
                    token: authtokens,
                    "Content-Type": "application/json",
                },
            };
            axios.get(`${BASE_URL}/profile`, token)
                .then((res) => {
                    setuser(res.data)
                    resolve(res.data)

                })
                .catch((err) => {
                    console.log(err);
                    reject(err)
                });
        })

    }

    async function fetchAllNotification() {
        return new Promise((resolve, reject) => {
            let authtokens = localStorage.getItem("authtoken");
            let display = {
                headers: {
                    'token': authtokens,
                }
            }
            axios.get(`${BASE_URL}/get_all_notification`, display)
                .then((res) => {
                    // setRole(res.data.role)
                    console.log(res.data, "All")
                    setNotifications(res.data)
                    resolve(res.data)

                })
                .catch((err) => {
                    console.log(err);
                    reject(err)

                });
        })
    }

    return (
        <DataContext.Provider value={{
            user, setuser, notifications, setNotifications, token, setToken, fetchUser, fetchAllNotification
        }}>
            {!isLoading && children}
        </DataContext.Provider>

    )
}
