import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
// import Signup from './components/signUp';
import Dashboard from './components/dashboard';
import Setting from './components/setting';
// import UserDashboard from './components/userDashboard';
import Dashboardpage from './pages/UserDashboard/dashboard';
import Dashboards from './pages/HR/Dashboard';
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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='App'>
          <div>
            <Routes>
              {/* <Route path="/" element={<Signup />} /> */}
              <Route path="/" element={<Login />} />
              <Route path="/dashboardpage" element={<Dashboards />} />
              <Route path="/dashboard" element={<Dashboardpage />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/setting" element={<Setting />} />
              <Route path="/applyleave" element={<ApplyLeave />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/leaverequest" element={<LeaveRequest />} />
              <Route path="/comments" element={<Comment />} />
              <Route path="/event" element={<Event />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/addproject" element={<AddProjectPage />} />
              <Route path="/project/:code" element={<AddTeamPage />} />
              <Route path="/Admin_leave_request" element={<LeaveRequests />} />

            </Routes>
          </div>

        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;