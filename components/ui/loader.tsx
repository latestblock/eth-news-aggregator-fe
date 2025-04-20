"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-4 border-slate-300 border-t-green-500 rounded-full animate-spin"></div>

      <p className="text-slate-600 dark:text-slate-300 mt-4 text-sm font-medium animate-pulse">
        Loading latest news...
      </p>
    </div>
  );
};

export default Loader;
