import { useState, useEffect } from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function ClassTimetableViewer() {
  const [timetable, setTimetable] = useState(() => {
    const stored = localStorage.getItem('timetable');
    return stored ? JSON.parse(stored) : [];
  });

  const [formData, setFormData] = useState({
    day: 'Monday',
    time: '',
    className: '',
    color: '#00bcd4',
  });

  useEffect(() => {
    localStorage.setItem('timetable', JSON.stringify(timetable));
  }, [timetable]);

  const addClass = () => {
    if (!formData.time || !formData.className) return;
    setTimetable([...timetable, formData]);
    setFormData({ ...formData, time: '', className: '' });
  };

  const deleteClass = (indexToDelete) => {
    setTimetable(timetable.filter((_, i) => i !== indexToDelete));
  };

  const clearSchedule = () => {
    if (confirm('Clear the entire schedule?')) {
      setTimetable([]);
    }
  };

  const filteredByDay = (day) => timetable.map((c, i) => ({ ...c, index: i })).filter((c) => c.day === day);

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Class Timetable Viewer</h1>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl mb-2">Add Class</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <select value={formData.day} onChange={(e) => setFormData({ ...formData, day: e.target.value })} className="p-2 border rounded">
            {days.map((d) => <option key={d}>{d}</option>)}
          </select>
          <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="p-2 border rounded" />
          <input type="text" placeholder="Class Name" value={formData.className} onChange={(e) => setFormData({ ...formData, className: e.target.value })} className="p-2 border rounded" />
          <input type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full h-full" />
          <button onClick={addClass} className="bg-blue-500 text-white rounded px-4 py-2">Add</button>
        </div>
      </div>

      <div className="mb-6 text-right">
        <button onClick={clearSchedule} className="bg-red-500 text-white px-4 py-2 rounded">Clear Schedule</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-gray-100 p-2 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{day}</h3>
            {filteredByDay(day).map((cls) => (
              <div key={cls.index} className="p-2 rounded mb-2 text-white flex justify-between items-center" style={{ backgroundColor: cls.color }}>
                <div>
                  <strong>{cls.time}</strong>: {cls.className}
                </div>
                <button
                  onClick={() => deleteClass(cls.index)}
                  className="ml-2 text-white bg-black bg-opacity-30 px-2 py-1 rounded hover:bg-opacity-60"
                  title="Delete"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
