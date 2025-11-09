import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroCover = () => {
  return (
    <div className="relative w-full h-[55vh] md:h-[60vh] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <Spline
        scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Soft gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35),rgba(0,0,0,0.75))]" />
      <div className="pointer-events-none absolute inset-0 p-6 sm:p-10 flex flex-col items-start justify-end text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          UniShare
        </h1>
        <p className="mt-2 text-white/80 text-sm sm:text-base max-w-xl">
          Share rides and group food orders with classmates. Cut costs, reduce waste, and meet new people.
        </p>
      </div>
    </div>
  );
};

export default HeroCover;
