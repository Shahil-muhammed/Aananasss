"use client";
import React from 'react';

// Explicitly type the component for React TypeScript standards
export default function FullscreenLayout(): React.JSX.Element {
  
  // Smoothly navigates to a section anchor programmatically if needed
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-screen min-h-screen bg-slate-900 overflow-x-hidden scroll-smooth antialiased">
      
      {/* SECTION 1: First Fullscreen Page */}
      <section 
        id="first-page"
        className="w-screen h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-6 text-center"
      >
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The Journey Begins
          </h1>
          <p className="text-slate-400 text-lg md:text-xl">
            This is the initial page viewport. Click below to seamlessly transition down to the next fullscreen view.
          </p>
          <button
            onClick={() => scrollToSection('second-page')}
            className="inline-flex h-12 items-center justify-center rounded-full bg-indigo-600 px-8 font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            Go to Second Section
          </button>
        </div>
      </section>

      {/* SECTION 2: Second Beautiful Fullscreen Page */}
      <section 
        id="second-page"
        className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-6 text-center relative overflow-hidden"
      >
        {/* Decorative backdrop elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.08),transparent_40%)] pointer-events-none" />
        
        <div className="max-w-2xl space-y-6 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
            View Active
          </span>
          
          <h2 className="text-5xl md:text-8xl font-black tracking-tight">
            <span className="block text-white mb-2">Hello,</span>
            <span className="block bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent filter drop-shadow-sm">
              Second Section.
            </span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full my-4" />

          <p className="max-w-md mx-auto text-slate-300 text-base md:text-lg font-light leading-relaxed">
            Utilizing full viewport width (<code className="text-indigo-300">w-screen</code>) and height (<code className="text-h-screen">h-screen</code>) to establish a striking standalone experience.
          </p>

          <button
            onClick={() => scrollToSection('first-page')}
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-sm px-6 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Scroll Back Up
          </button>
        </div>
      </section>

    </div>
  );
}