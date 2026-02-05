import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-emerald-100 dark:border-emerald-900/30 rounded-full animate-pulse"></div>
        {/* Spinning inner ring */}
        <div className="absolute w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        {/* Icon in center */}
        <div className="absolute text-primary animate-pulse">
          <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
