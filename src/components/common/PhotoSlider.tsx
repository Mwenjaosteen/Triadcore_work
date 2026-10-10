import React, { useState, useEffect, useRef } from 'react';
import { PHOTO_SLIDER_ITEMS, PhotoSlideItem } from '../../data/curriculumData';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  MapPin,
  Sparkles,
  Play,
  Pause,
  Trees,
  Layers,
} from 'lucide-react';

export const PhotoSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<PhotoSlideItem | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const slides = PHOTO_SLIDER_ITEMS;

  // Auto slide to the left every 3.5 seconds
  useEffect(() => {
    if (isPaused || fullscreenImage) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [isPaused, fullscreenImage, slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      // Swiped left -> next slide
      handleNext();
    } else if (diff < -45) {
      // Swiped right -> prev slide
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-emerald-900/40 bg-emerald-950 text-white my-6">
      {/* Top Banner Header with live sliding indicator */}
      <div className="bg-emerald-900/95 border-b border-emerald-800/60 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-extrabold uppercase tracking-wider text-emerald-100 text-[11px] sm:text-xs">
            FFTC Field Training & Reforestation in Action
          </span>
          <span className="hidden sm:inline text-emerald-400">·</span>
          <span className="hidden sm:inline text-emerald-300 text-[11px]">Nyandarua County Highlands</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 transition-colors cursor-pointer"
            title={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-300" /> : <Pause className="w-3 h-3 text-emerald-300" />}
            <span className="hidden xs:inline">{isPaused ? 'Resume' : 'Auto-Sliding'}</span>
          </button>

          <span className="font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            {activeIndex + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Main Slide Viewport (Smooth Sliding to Left) */}
      <div
        className="relative w-full overflow-hidden aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] max-h-[460px] min-h-[260px] cursor-pointer group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding Ribbon Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative w-full h-full shrink-0 select-none overflow-hidden"
              onClick={() => setFullscreenImage(slide)}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Multi-stage dramatic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/30 to-transparent sm:max-w-xl" />

              {/* Slide Content Caption Box */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end max-w-2xl text-left pointer-events-none">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-800/90 text-amber-300 font-bold text-[10px] sm:text-xs border border-emerald-600/60 shadow-sm backdrop-blur-md">
                    <Sparkles className="w-3 h-3" />
                    {slide.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 text-emerald-200 text-[10px] sm:text-xs backdrop-blur-md border border-white/10">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {slide.location}
                  </span>
                </div>

                <h3 className="text-base sm:text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                  {slide.title}
                </h3>

                <p className="hidden sm:block text-xs sm:text-sm text-emerald-100/90 mt-1.5 line-clamp-2 leading-relaxed drop-shadow-sm max-w-xl">
                  {slide.caption}
                </p>

                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-amber-300 font-semibold font-mono">
                  <Trees className="w-3.5 h-3.5" />
                  <span>{slide.fieldFocus}</span>
                </div>
              </div>

              {/* Click to expand badge on top-right */}
              <div className="absolute top-4 right-4 bg-emerald-950/80 hover:bg-emerald-900 border border-white/20 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm pointer-events-auto">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline">Inspect Photo</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrow Overlays */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-sm cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-sm cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Pagination Indicator Dots */}
        <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 flex items-center gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
              className={`transition-all rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-7 sm:w-8 h-2 bg-amber-400 shadow-md'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Secondary Ribbon: Scrolling Strip of All 5 Field Photos with Instant Click-To-Slide */}
      <div className="bg-emerald-900/90 border-t border-emerald-800/80 p-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-3">
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Gallery:</span>
          </div>

          <div className="flex items-center gap-3 w-full">
            {slides.map((slide, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-center gap-2.5 p-1.5 rounded-xl border text-left transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950 border-amber-400 ring-2 ring-amber-400/30 shadow-md'
                      : 'bg-emerald-950/60 border-emerald-800/60 hover:border-emerald-700 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-14 h-10 sm:w-16 sm:h-11 rounded-lg object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="pr-2 max-w-[150px] sm:max-w-[200px]">
                    <div className="text-[11px] font-bold text-white truncate leading-tight">
                      {slide.title}
                    </div>
                    <div className="text-[10px] text-emerald-300 truncate">
                      {slide.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-emerald-950 rounded-2xl overflow-hidden border border-emerald-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-emerald-900 border-b border-emerald-800 flex items-center justify-between text-white">
              <div>
                <h4 className="font-bold text-sm sm:text-base leading-tight">
                  {fullscreenImage.title}
                </h4>
                <p className="text-xs text-emerald-300">
                  {fullscreenImage.location} · {fullscreenImage.category}
                </p>
              </div>
              <button
                onClick={() => setFullscreenImage(null)}
                className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={fullscreenImage.image}
                alt={fullscreenImage.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 sm:p-5 bg-emerald-950 text-white space-y-2 text-xs sm:text-sm">
              <p className="text-emerald-100 leading-relaxed">
                {fullscreenImage.caption}
              </p>
              <div className="inline-block px-3 py-1 rounded-md bg-emerald-900 text-amber-300 font-mono text-xs font-semibold">
                Field Focus: {fullscreenImage.fieldFocus}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
