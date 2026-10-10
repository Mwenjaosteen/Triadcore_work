import React from 'react';
import { GLOSSARY_TERMS } from '../../data/curriculumData';
import {
  ShieldCheck,
  BookA,
  Users,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Building,
} from 'lucide-react';

export const PolicyFrameworkView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Institutional Policies, Glossary & TGAN Administration
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Governance, quality assurance, admissions criteria, and key terminology from the FFTC Curriculum Framework.
        </p>
      </div>

      {/* Institutional Policies Summary (Chapter Two) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Policy 1: Admissions & Enrollment</span>
          </div>
          <ul className="space-y-1 text-slate-600 pl-4 list-disc marker:text-emerald-600">
            <li>Primary eligibility: Smallholders with at least 0.5 acres of land.</li>
            <li>No prior formal forestry knowledge required for CFFB basics.</li>
            <li>Gender Parity: Minimum 40% enrolled trainees in each cohort must be women.</li>
            <li>Scholarship fund maintained for vulnerable and youth farmers.</li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Policy 2 & 4: 60% Practical Standard</span>
          </div>
          <ul className="space-y-1 text-slate-600 pl-4 list-disc marker:text-emerald-600">
            <li>Minimum 60% of all training time shall be hands-on in farm nurseries or fields.</li>
            <li>Competency assessed via practical demonstration rather than theory exams alone.</li>
            <li>Every trainee must prepare an individualized 12-Month Farm Forestry Action Plan.</li>
            <li>Formal TVETA accreditation pathway within first 3 years of operation.</li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Building className="w-4 h-4 text-emerald-700" />
            <span>Policy 5: Environmental Stewardship</span>
          </div>
          <ul className="space-y-1 text-slate-600 pl-4 list-disc marker:text-emerald-600">
            <li>All demonstration plots managed using certified sustainable practices.</li>
            <li>No harmful agrochemicals contrary to Integrated Pest Management.</li>
            <li>Mandatory 30m riparian water catchment protection on all managed land.</li>
            <li>Annual environmental audit in compliance with Kenya EMCA regulations.</li>
          </ul>
        </div>
      </div>

      {/* Glossary of Key Terms (Page 35) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookA className="w-5 h-5 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Official Glossary of Key Terms (Page 35)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">10 Standard Definitions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {GLOSSARY_TERMS.map((gt, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-emerald-950 text-sm block">{gt.term}</span>
              <p className="text-slate-700 leading-snug">{gt.simpleMeaning}</p>
              {gt.localContext && (
                <p className="text-[11px] text-emerald-800 italic pt-1 border-t border-slate-200/60">
                  {gt.localContext}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Enrollment Card (Page 45) */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg border border-emerald-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Institutional Contact & Course Enrollment
            </span>
            <h3 className="text-lg font-bold text-white">Tree Growers Association of Nyandarua (TGAN)</h3>
            <p className="text-xs text-emerald-200">Farm Forestry Training Center (FFTC) Secretariat</p>
          </div>
          <div className="text-xs text-emerald-300 sm:text-right">
            <span>Prepared by:</span>
            <p className="font-bold text-white">Besqua Consultants Limited, Nyahururu</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Contact Person</span>
              <span className="font-bold text-white">Benjamin U. Karanja</span>
              <span className="text-emerald-300 text-[11px] block">Chairman, TGAN</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Helpline & WhatsApp</span>
              <span className="font-mono text-white font-bold">0720496341 / 0788858006</span>
              <span className="text-emerald-300 text-[11px] block">Mon–Fri: 8:00 AM – 5:00 PM</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Postal & Physical Address</span>
              <span className="text-white font-medium">P.O. Box 289-20303</span>
              <span className="text-emerald-300 text-[11px] block">Ol'Kalou, Nyandarua County, Kenya</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-emerald-800 text-center text-xs text-emerald-300 italic">
          "Empowering rural communities through sustainable tree-based land use and management"
        </div>
      </div>
    </div>
  );
};
