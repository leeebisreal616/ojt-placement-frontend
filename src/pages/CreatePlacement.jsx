import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function CreatePlacement() {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await client.post('/placements', {
        studentId: user.id,
        companyName,
        position,
        startDate,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Could not create placement. Check all fields are filled.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <span className="font-medium text-slate-900">OJT placement portal</span>
      </nav>

      <div className="max-w-md mx-auto p-6">
        <button onClick={() => navigate('/dashboard')} className="text-sm text-slate-500 hover:text-slate-800 mb-4">
          ← Back
        </button>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h1 className="text-base font-medium text-slate-900 mb-1">New placement</h1>
          <p className="text-sm text-slate-500 mb-6">Apply for an OJT placement.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-slate-600">Company name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Position</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="mt-2 bg-slate-800 text-white text-sm font-medium rounded-md py-2 hover:bg-slate-700 transition"
            >
              Submit application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}