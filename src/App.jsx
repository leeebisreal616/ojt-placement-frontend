import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePlacement from './pages/CreatePlacement';
import PlacementDetail from './pages/PlacementDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/placements/new" element={<ProtectedRoute><CreatePlacement /></ProtectedRoute>} />
      <Route path="/placements/:id" element={<ProtectedRoute><PlacementDetail /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;