import React, { useEffect, useState } from 'react';
import HeroCover from './components/HeroCover';
import AuthCard from './components/AuthCard';
import ModeSelector from './components/ModeSelector';
import ShareForm from './components/ShareForm';
import ChatFeed from './components/ChatFeed';

function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('ride');

  useEffect(() => {
    const cur = localStorage.getItem('unishare_current_user');
    if (cur) setUser(JSON.parse(cur));
  }, []);

  const handlePost = (_post, updated) => {
    // Optional: any optimistic updates already handled inside ShareForm
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <HeroCover />

        {!user ? (
          <div className="mt-10">
            <AuthCard onAuth={setUser} />
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hi,</p>
                <h2 className="text-2xl font-semibold text-gray-900">{user.name} 👋</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    localStorage.removeItem('unishare_current_user');
                    setUser(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>

            <ModeSelector mode={mode} setMode={setMode} />

            <ShareForm mode={mode} user={user} onPost={handlePost} />

            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Group Feed</h3>
                <p className="text-sm text-gray-500">{mode === 'ride' ? 'Rides near you' : 'Food orders near you'}</p>
              </div>
              <ChatFeed mode={mode} user={user} />
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-xs text-gray-500">
          Built for students to save money and reduce waste • Prototype demo
        </footer>
      </div>
    </div>
  );
}

export default App;
