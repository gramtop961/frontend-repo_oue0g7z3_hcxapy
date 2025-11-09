import React, { useState } from 'react';
import { User, Lock, Mail, Rocket } from 'lucide-react';

const AuthCard = ({ onAuth }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simple localStorage-based mock auth for prototype
    const users = JSON.parse(localStorage.getItem('unishare_users') || '[]');
    if (mode === 'register') {
      const exists = users.find((u) => u.email === form.email);
      if (exists) {
        alert('Account already exists. Please login.');
        setLoading(false);
        return;
      }
      const newUser = { name: form.name || 'Student', email: form.email, password: form.password, verified: true };
      localStorage.setItem('unishare_users', JSON.stringify([...users, newUser]));
      localStorage.setItem('unishare_current_user', JSON.stringify(newUser));
      onAuth(newUser);
    } else {
      const found = users.find((u) => u.email === form.email && u.password === form.password);
      if (!found) {
        alert('Invalid credentials. Try registering.');
        setLoading(false);
        return;
      }
      localStorage.setItem('unishare_current_user', JSON.stringify(found));
      onAuth(found);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur border border-black/5 rounded-2xl shadow-xl p-6 md:p-8 -mt-16">
      <div className="flex items-center gap-2 text-gray-800 mb-6">
        <Rocket className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        )}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition disabled:opacity-60"
        >
          {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        {mode === 'login' ? (
          <>
            New here?{' '}
            <button onClick={() => setMode('register')} className="text-blue-600 hover:underline">
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button onClick={() => setMode('login')} className="text-blue-600 hover:underline">
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthCard;
