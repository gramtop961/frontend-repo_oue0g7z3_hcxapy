import React, { useState } from 'react';

const initialState = {
  ride: { source: '', destination: '', time: '', seats: 1 },
  food: { restaurant: '', items: '', time: '', type: 'Pickup' },
};

const ShareForm = ({ mode, user, onPost }) => {
  const [form, setForm] = useState(initialState[mode]);

  React.useEffect(() => {
    setForm(initialState[mode]);
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const post = {
      id: crypto.randomUUID(),
      mode,
      user: { name: user?.name || 'Student', verified: true },
      createdAt: new Date().toISOString(),
      data: form,
      joiners: [],
    };
    const key = `unishare_${mode}_posts`;
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = [post, ...list];
    localStorage.setItem(key, JSON.stringify(updated));
    onPost(post, updated);
    setForm(initialState[mode]);
  };

  return (
    <form onSubmit={submit} className="grid gap-3 md:grid-cols-4 items-end bg-white border border-gray-200 rounded-2xl p-4">
      {mode === 'ride' ? (
        <>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-600">Source</label>
            <input name="source" value={form.source} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500" placeholder="Hostel" required />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-600">Destination</label>
            <input name="destination" value={form.destination} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500" placeholder="Campus" required />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-600">Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-600">Seats</label>
            <input type="number" min="1" max="6" name="seats" value={form.seats} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500" required />
          </div>
        </>
      ) : (
        <>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-600">Restaurant</label>
            <input name="restaurant" value={form.restaurant} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500" placeholder="Domino's" required />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-600">Items</label>
            <input name="items" value={form.items} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500" placeholder="2 Margherita" required />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-600">Delivery Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-600">Order Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500">
              <option>Pickup</option>
              <option>Delivery</option>
            </select>
          </div>
        </>
      )}

      <div className="md:col-span-4 flex gap-3">
        <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Share</button>
        <p className="text-sm text-gray-500 self-center">Your post will appear in the group feed below.</p>
      </div>
    </form>
  );
};

export default ShareForm;
