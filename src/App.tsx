import React from 'react';
import { FFTCProvider, useFFTC } from './context/FFTCContext';
import { FFTCHeader } from './components/common/FFTCHeader';
import { CurriculumView } from './components/curriculum/CurriculumView';
import { PracticalExercisesHub } from './components/exercises/PracticalExercisesHub';
import { CompetencyAssessmentView } from './components/assessment/CompetencyAssessmentView';
import { ManualsDirectoryView } from './components/manuals/ManualsDirectoryView';
import { PolicyFrameworkView } from './components/policy/PolicyFrameworkView';
import { CertificateView } from './components/certificate/CertificateView';
import { AdminCurriculumPortal } from './components/admin/AdminCurriculumPortal';
import { AuthModal } from './components/auth/AuthModal';
import {
  BookOpen,
  Trees,
  CheckCircle2,
  Award,
  User,
  ShieldCheck,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useFFTC();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Universal Top Header */}
      <FFTCHeader />

      {/* Main Content Workspace */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-8 pb-24 lg:pb-12 max-w-7xl mx-auto w-full">
        {activeTab === 'curriculum' && <CurriculumView />}
        {activeTab === 'exercises' && <PracticalExercisesHub />}
        {activeTab === 'assessment' && <CompetencyAssessmentView />}
        {activeTab === 'manuals' && <ManualsDirectoryView />}
        {activeTab === 'policy' && <PolicyFrameworkView />}
        {activeTab === 'certificate' && <CertificateView />}
        {activeTab === 'admin' && <AdminCurriculumPortal />}
      </main>

      {/* Sticky Mobile Bottom Navigation Bar (Visible only on mobile/tablet screens < xl) */}
      <nav className="no-print xl:hidden fixed bottom-0 left-0 right-0 z-30 bg-emerald-950/95 backdrop-blur-md border-t border-emerald-800 px-1 py-1 flex items-center justify-around shadow-2xl text-emerald-300">
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer ${
            activeTab === 'curriculum' ? 'text-amber-400 font-bold bg-emerald-900/40' : 'hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 tracking-tight">Courses</span>
        </button>

        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer ${
            activeTab === 'exercises' ? 'text-amber-400 font-bold bg-emerald-900/40' : 'hover:text-white'
          }`}
        >
          <Trees className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 tracking-tight">Practicals</span>
        </button>

        <button
          onClick={() => setActiveTab('assessment')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer ${
            activeTab === 'assessment' ? 'text-amber-400 font-bold bg-emerald-900/40' : 'hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 tracking-tight">Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer ${
            activeTab === 'certificate' ? 'text-amber-400 font-bold bg-emerald-900/40' : 'hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 tracking-tight">Award</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer ${
            activeTab === 'admin' ? 'text-purple-300 font-bold bg-purple-950/60' : 'hover:text-white text-purple-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 tracking-tight">Admin</span>
        </button>
      </nav>

      {/* Global Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <FFTCProvider>
      <MainAppContent />
    </FFTCProvider>
  );
}
