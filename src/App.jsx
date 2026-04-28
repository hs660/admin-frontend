import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import AdminDashboard from './pages/Dashboard';
import ProtectedRoute from './components/Protect.route.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





