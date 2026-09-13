import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
  completed: 'bg-slate-100 text-slate-600',
};

export default function PlacementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placement, setPlacement] = useState(null);
  const [entries, setEntries] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [hoursRendered, setHoursRendered] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const loadData = async () => {
    const [placementRes, logbookRes] = await Promise.all([
      client.get(`/placements/${id}`),
      client.get(`/logbook/placement/${id}`),
    ]);
    setPlacement(placementRes.data);
    setEntries(logbookRes.data);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleStatusChange = async (status) => {
    await client.patch(`/placements/${id}`, { status });
    loadData();
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    await client.post('/logbook', {
      placementId: Number(id),
      entryDate,
      taskDescription,
      hoursRendered: Number(hoursRendered),
    });
    setTaskDescription('');
    setEntryDate('');
    setHoursRendered('');
    loadData();
  };

  if (!placement) return <div className="min-h-screen bg-[#f8f9fb] p-6 text-sm text-slate-500">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <span className="font-medium text-slate-900">OJT placement portal</span>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        <button onClick={() => navigate('/dashboard')} className="text-sm text-slate-500 hover:text-slate-800 mb-4">
          ← Back
        </button>

        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-1">
            <h1 className="text-base font-medium text-slate-900">{placement.companyName}</h1>
            <span className={`text-xs font-medium px-3 py-1 rounded-md ${statusStyles[placement.status]}`}>
              {placement.status}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            {placement.position} · {placement.student?.fullName}
          </p>
          <p className="text-sm text-slate-500">Started {placement.startDate}</p>

          {user?.role === 'coordinator' && placement.status === 'pending' && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleStatusChange('approved')}
                className="text-sm bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange('rejected')}
                className="text-sm bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-medium text-slate-900 mb-4">Logbook</h2>

          <div className="flex flex-col gap-2 mb-6">
            {entries.length === 0 ? (
              <p className="text-sm text-slate-500">No entries yet.</p>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500 w-24">{entry.entryDate}</span>
                  <span className="flex-1 text-slate-800">{entry.taskDescription}</span>
                  <span className="text-slate-500">{entry.hoursRendered}h</span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddEntry} className="flex flex-col gap-3 border-t border-slate-100 pt-4">
            <div className="flex gap-3">
              <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm flex-1"
                required
              />
              <input
                type="number"
                step="0.5"
                placeholder="Hours"
                value={hoursRendered}
                onChange={(e) => setHoursRendered(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm w-24"
                required
              />
            </div>
            <textarea
              placeholder="Task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2 text-sm"
              rows={2}
              required
            />
            <button
              type="submit"
              className="bg-slate-800 text-white text-sm font-medium rounded-md py-2 hover:bg-slate-700 transition"
            >
              Add entry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}