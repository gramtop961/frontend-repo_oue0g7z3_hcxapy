import React from 'react';
import { Car, Pizza, CheckCircle2 } from 'lucide-react';

const Card = ({ active, icon: Icon, title, desc, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex-1 text-left rounded-2xl border p-5 transition shadow-sm hover:shadow-md focus:outline-none ${
      active ? 'border-blue-600 ring-2 ring-blue-200 bg-white' : 'border-gray-200 bg-white'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`rounded-xl p-2 ${active ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-700'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          {active && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
        </div>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  </button>
);

const ModeSelector = ({ mode, setMode }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card
        active={mode === 'ride'}
        icon={Car}
        title="Share a Ride"
        desc="Pool cabs and autos to the same destination."
        onClick={() => setMode('ride')}
      />
      <Card
        active={mode === 'food'}
        icon={Pizza}
        title="Group a Food Order"
        desc="Bundle orders from the same restaurant."
        onClick={() => setMode('food')}
      />
    </div>
  );
};

export default ModeSelector;
