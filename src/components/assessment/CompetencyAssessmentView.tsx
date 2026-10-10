import React, { useState } from 'react';
import { useFFTC } from '../../context/FFTCContext';
import {
  CheckCircle2,
  Award,
  AlertCircle,
  FileText,
  User,
  GraduationCap,
  Sparkles,
  Printer,
} from 'lucide-react';

export const CompetencyAssessmentView: React.FC = () => {
  const {
    learner,
    competencies,
    toggleCompetency,
    calculateFinalGrade,
    issueCertificate,
    setActiveTab,
  } = useFFTC();

  const [trainerName, setTrainerName] = useState('Benjamin U. Karanja (Lead Trainer)');
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [trainerComments, setTrainerComments] = useState(
    'Demonstrated excellent practical seedling planting, biochar charging technique, and a realistic 12-month farm forestry blueprint for Nyandarua highlands.'
  );

  const result = calculateFinalGrade();
  const competentCount = competencies.filter((c) => c.status === 'competent').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Competency-Based Assessment & Grading (Pages 31 & 32)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Skill-based evaluation verifying the 11 practical competencies required for CFFB certification.
          </p>
        </div>

        <button
          onClick={issueCertificate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer self-start sm:self-auto min-h-[44px]"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Finalize & Issue CFFB Certificate</span>
        </button>
      </div>

      {/* Grade Summary Cards (Table 1 & 2 Page 20) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Written Quizzes (20%)</span>
          <span className="text-xl font-mono font-bold text-slate-900 tabular-nums">{result.writtenScore}%</span>
          <span className="text-[10px] text-slate-500 block">Theory knowledge</span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Practical Fieldwork (40%)</span>
          <span className="text-xl font-mono font-bold text-emerald-700 tabular-nums">{result.practicalScore}%</span>
          <span className="text-[10px] text-emerald-600 block">{competentCount}/11 Skills Verified</span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Farm Action Plan (25%)</span>
          <span className="text-xl font-mono font-bold text-slate-900 tabular-nums">{result.planScore}%</span>
          <span className="text-[10px] text-slate-500 block">12-Month Blueprint</span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Participation (15%)</span>
          <span className="text-xl font-mono font-bold text-slate-900 tabular-nums">{result.participationScore}%</span>
          <span className="text-[10px] text-slate-500 block">Peer Engagement</span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-950 text-white shadow-xs col-span-2 lg:col-span-1 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase text-emerald-300 block">Overall Final Grade</span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-mono font-extrabold text-amber-400 tabular-nums">{result.totalWeighted}%</span>
            <span className="text-xs font-bold text-emerald-200">{result.grade}</span>
          </div>
          <span className="text-[10px] text-emerald-300/80">Table 2 Grading Scale</span>
        </div>
      </div>

      {/* Practical Skills Checklist Table (Page 31) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              A. Practical Skills Checklist (Page 31)
            </h3>
            <p className="text-xs text-slate-500">
              Assess each participant based on what they can explain, demonstrate, and apply in field conditions.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
            {competentCount} of 11 Competencies Mastered
          </span>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[480px]">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Core Demonstrated Skill</th>
                <th className="py-2.5 px-4">Aligned Module</th>
                <th className="py-2.5 px-4 text-center">Competent</th>
                <th className="py-2.5 px-4 text-center">Needs More Practice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {competencies.map((comp) => {
                const isCompetent = comp.status === 'competent';
                const isNeedsWork = comp.status === 'needs_practice';

                return (
                  <tr key={comp.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-medium text-slate-900">
                      {comp.skill}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 font-mono text-[11px]">
                      Module {comp.module}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <button
                        onClick={() => toggleCompetency(comp.id, 'competent')}
                        className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer min-h-[36px] ${
                          isCompetent
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {isCompetent ? '✓ Competent' : 'Mark Competent'}
                      </button>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <button
                        onClick={() => toggleCompetency(comp.id, 'needs_practice')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer min-h-[36px] ${
                          isNeedsWork
                            ? 'bg-amber-500 text-white font-bold'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        Needs Practice
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Participant Assessment Record (Page 32) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          B. Participant Assessment Record (Official Form Page 32)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block">Candidate Trainee</label>
            <span className="font-bold text-slate-900 text-sm block">{learner.name}</span>
            <span className="text-[11px] text-slate-500">{learner.location} · {learner.county}</span>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block">Assessment Date</label>
            <input
              type="date"
              value={assessmentDate}
              onChange={(e) => setAssessmentDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block">Lead Trainer / Examiner</label>
            <input
              type="text"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Trainer Field Assessment Comments:
          </label>
          <textarea
            rows={3}
            value={trainerComments}
            onChange={(e) => setTrainerComments(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Official Award Recommendation:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs">
              {result.totalWeighted >= 50 ? 'Recommended for CFFB Certificate' : 'Requires Remedial Field Sessions'}
            </span>
          </div>

          <button
            onClick={issueCertificate}
            className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer min-h-[44px]"
          >
            Generate Official Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
