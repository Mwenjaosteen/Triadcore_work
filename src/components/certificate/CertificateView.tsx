import React from 'react';
import { useFFTC } from '../../context/FFTCContext';
import {
  Award,
  Printer,
  Download,
  CheckCircle2,
  Share2,
  Trees,
} from 'lucide-react';

export const CertificateView: React.FC = () => {
  const { learner, calculateFinalGrade } = useFFTC();

  const result = calculateFinalGrade();
  const certData = learner.certificateEarned || {
    certNumber: 'FFTC-CFFB-2026-0842',
    courseName: 'Certificate in Farm Forestry Basics (CFFB)',
    issueDate: new Date().toISOString().split('T')[0],
    grade: result.grade === 'Needs Practice' ? 'Pass' : result.grade,
    score: result.totalWeighted
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar (Hidden in Print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h1 className="text-base font-bold text-slate-900">
              Official CFFB Completion Certificate
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Certified under the TVETA aligned Farm Forestry Training Center framework.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer min-h-[44px]"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Print Official Certificate (A4)</span>
          </button>
        </div>
      </div>

      {/* The Printable Certificate Document */}
      <div className="flex justify-center p-2 sm:p-4">
        <div className="w-full max-w-4xl bg-[#fffef9] border-8 sm:border-12 border-emerald-900 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden text-center text-slate-900 space-y-6">
          {/* Subtle Guilloche / Watermark Pattern */}
          <div className="absolute inset-0 border-2 border-amber-600/30 m-3 sm:m-4 rounded-2xl pointer-events-none" />

          {/* Top Logo & Headers */}
          <div className="space-y-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden shadow-md border-2 border-emerald-800">
              <img
                src="/src/assets/images/fftc_logo_emblem_1791668840881.jpg"
                alt="FFTC Official Seal"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold tracking-wider text-emerald-950 uppercase font-serif">
              Farm Forestry Training Center
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 tracking-wide">
              NYANDARUA COUNTY, KENYA
            </p>
            <p className="text-[11px] sm:text-xs text-slate-600 italic">
              An Initiative of the Tree Growers Association of Nyandarua (TGAN)
            </p>
          </div>

          {/* Certificate Award Text */}
          <div className="space-y-3 pt-2">
            <p className="text-xs sm:text-sm font-serif italic text-slate-600">
              This is to officially certify that
            </p>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-emerald-900 border-b-2 border-amber-500/60 pb-2 max-w-lg mx-auto font-serif">
              {learner.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              has completed the rigorous 30-credit-hour curriculum, practical field demonstrations, and competency assessments, and is hereby awarded the:
            </p>

            <div className="py-2">
              <span className="inline-block px-4 py-2 rounded-xl bg-emerald-900 text-amber-300 font-extrabold text-base sm:text-xl tracking-wide uppercase shadow-sm">
                Certificate in Farm Forestry Basics (CFFB)
              </span>
            </div>

            <p className="text-xs text-slate-700">
              Classification:{' '}
              <strong className="text-emerald-950 uppercase">
                {certData.grade} ({certData.score}%)
              </strong>
            </p>
          </div>

          {/* Core Competencies Endorsement */}
          <div className="pt-2 text-[10px] sm:text-xs text-slate-500 max-w-lg mx-auto leading-relaxed border-t border-slate-200">
            Verified Competencies: Farm Tree Mapping · Tree Nursery Management & Seed Selection · Formative Pruning & Coppicing · Biochar Soil Enrichment · Enterprise Costing & Value Chains · 12-Month Farm Forestry Action Plan.
          </div>

          {/* Signatures & Serial Number */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 items-end text-xs border-t border-slate-200">
            <div>
              <div className="font-serif italic text-base text-slate-800 font-bold border-b border-slate-400 pb-1 mb-1">
                Benjamin U. Karanja
              </div>
              <span className="text-[11px] font-bold text-slate-800 block">Chairman</span>
              <span className="text-[10px] text-slate-500 block">Tree Growers Association of Nyandarua</span>
            </div>

            <div className="hidden sm:block">
              <div className="w-16 h-16 mx-auto rounded-full border border-dashed border-amber-600/80 flex items-center justify-center text-[10px] font-bold text-amber-700 uppercase tracking-tighter">
                OFFICIAL SEAL
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                Reg: {certData.certNumber}
              </span>
            </div>

            <div>
              <div className="font-serif italic text-base text-slate-800 font-bold border-b border-slate-400 pb-1 mb-1">
                Dean of Academics
              </div>
              <span className="text-[11px] font-bold text-slate-800 block">Academic Committee</span>
              <span className="text-[10px] text-slate-500 block">Date: {certData.issueDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
