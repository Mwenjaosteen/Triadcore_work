import React from 'react';
import { CURRICULUM_MANUALS, CERTIFICATION_LADDER } from '../../data/curriculumData';
import {
  GraduationCap,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';

export const ManualsDirectoryView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Curriculum Framework: 10 Training Manuals & Certification Ladder
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Comprehensive curriculum structure developed by the Tree Growers Association of Nyandarua (TGAN) aligned with TVETA.
        </p>
      </div>

      {/* Certification Ladder (Part Two & Chapter 4) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Farmer Certification Ladder (Table 4 Page 17)
          </h2>
          <span className="text-xs text-emerald-700 font-semibold">Structured Competency Levels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATION_LADDER.map((cert) => (
            <div
              key={cert.code}
              className={`p-5 rounded-2xl border transition-all shadow-xs flex flex-col justify-between ${
                cert.code === 'CFFB'
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300 ring-2 ring-emerald-600/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                    {cert.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">{cert.level}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{cert.name}</h3>

                <p className="text-xs text-slate-600 leading-relaxed">{cert.target}</p>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                  <p>⏱️ <strong>Duration:</strong> {cert.duration}</p>
                  <p>📖 <strong>Manuals:</strong> {cert.manuals}</p>
                  <p>💰 <strong>Fee:</strong> {cert.feeKES > 0 ? `KES ${cert.feeKES.toLocaleString()}` : 'Honorary Award'}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-medium text-emerald-800">
                  Entry: {cert.prerequisite}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 10 Core Training Manuals (Part Four Pages 24-44) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              The 10 Official FFTC Training Manuals
            </h2>
            <p className="text-xs text-slate-500">
              Modular, field-tested reference publications prepared for smallholders and extension workers.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">10 Manuals · 240+ Training Hours</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CURRICULUM_MANUALS.map((m) => (
            <div
              key={m.number}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-colors flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900 text-amber-300 font-bold font-mono flex items-center justify-center shrink-0">
                  {m.number}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">Manual {m.number}: {m.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span>{m.duration}</span>
                    <span>·</span>
                    <span className="font-medium text-emerald-800">{m.level}</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium shrink-0">
                Curriculum
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
