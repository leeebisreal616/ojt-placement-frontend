import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
  completed: 'bg-slate-100 text-slate-600',
};

export default function Dashboard() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchPlacements = async () => {
      try {
        const endpoint = user.role === 'coordinator' ? '/placements' : '/placements/my/placements';
        const res = await client.get(endpoint);
        setPlacements(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacements();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <span className="font-medium text-slate-900">OJT placement portal</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{user?.fullName}</span>
          <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-slate-800">
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-base font-medium text-slate-900">
            {user?.role === 'coordinator' ? 'All placements' : 'My placements'}
          </h1>
          <Link
            to="/placements/new"
            className="bg-slate-800 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-slate-700 transition"
          >
            + New placement
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : placements.length === 0 ? (
          <p className="text-sm text-slate-500">No placements yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {placements.map((p) => (
              <Link
                key={p.id}
                to={`/placements/${p.id}`}
                className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex justify-between items-center hover:border-slate-300 transition"
              >
                <div>
                  <p className="font-medium text-sm text-slate-900">{p.companyName}</p>
                  <p className="text-sm text-slate-500">
                    {p.position} · {p.student?.fullName || 'Student'}
                  </p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-md ${statusStyles[p.status] || statusStyles.completed}`}>
                  {p.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}