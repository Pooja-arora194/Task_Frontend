import './App.css';
import './btn.css'
import './custom.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Setting from './components/setting';
import LeaveRequests from './pages/Admin/leaveRequest';
import ApplyLeave from './pages/UserDashboard/applyLeave';
import Profile from './pages/UserDashboard/profile';
import Leaves from './pages/UserDashboard/leaves';
import AddUser from './pages/UserDashboard/adduser';
import LeaveRequest from './pages/HR/leaveRequest';
import Comment from './pages/utils/comment';
import Event from './pages/HR/Event';
import Invite from './pages/HR/invite';
import AddProjectPage from './pages/HR/addproject';
import AddTeamPage from './pages/HR/addteam';
import Loader from './loader/loader';
import EmployeeList from './pages/HR/employeeList';
import { createContext, useState } from "react";
import DataContext from './context/DataContext';
import Layout from './layout/Layout';

export const LoaderContext = createContext(null);

function App() {
  const [loading, setLoading] = useState(false);

  const showLoader = () => {
    setLoading(true)
  }
  const hideLoader = () => {
    setLoading(false)
  }
  if (loading) {
    document.body.classList.toggle('overflowhidden', loading);
  }
  else {
    document.body.classList.remove('overflowhidden', loading);
  }

  return (

    <div className="App">
      <DataContext>
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
          <Loader value={loading} />
          
          <BrowserRouter>
            <div className='App'>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboardpage" element={<Dashboard />} />
                  {/* <Route path="/dashboard" element={<Dashboardpage />} /> */}
                  {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/applyleave" element={<ApplyLeave />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/leaves" element={<Leaves />} />
                  <Route path="/adduser" element={<AddUser />} />
                  <Route path="/leaverequest" element={<LeaveRequest />} />
                  {/* <Route path="/comments" element={<Comment />} /> */}
                  {/* <Route path="/event" element={<Event />} /> */}
                  <Route path="/invite" element={<Invite />} />
                  {/* <Route path="/addproject" element={<AddProjectPage />} /> */}
                  {/* <Route path="/project/:code" element={<AddTeamPage />} /> */}
                  {/* <Route path="/Admin_leave_request" element={<LeaveRequests />} /> */}
                  {/* <Route path="/layout" element={<Layout />} /> */}

                  {/* <Route path="/employee_list" element={<EmployeeList />} /> */}
                </Routes>
            </div>
          </BrowserRouter>
        </LoaderContext.Provider>
      </DataContext>
    </div >
  );
}

export default App;