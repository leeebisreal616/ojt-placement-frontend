import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePlacement from './pages/CreatePlacement';
import PlacementDetail from './pages/PlacementDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/placements/new" element={<CreatePlacement />} />
      <Route path="/placements/:id" element={<PlacementDetail />} />
    </Routes>
  );
}

export default App;