import React, { useState } from 'react';
import { useFFTC } from '../../context/FFTCContext';
import { CurriculumCourse, TrainingModule } from '../../types/fftc';
import {
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  Users,
  Award,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  GraduationCap,
  X,
  Eye,
  Check,
} from 'lucide-react';

export const AdminCurriculumPortal: React.FC = () => {
  const {
    currentUser,
    courses,
    learners,
    certificatesRegistry,
    addCourse,
    updateCourse,
    deleteCourse,
    setActiveTab,
  } = useFFTC();

  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'curriculums' | 'enrollments' | 'certificates'>('curriculums');
  const [searchLearner, setSearchLearner] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [searchCert, setSearchCert] = useState('');

  // Course Add/Edit Modal State
  const [editingCourse, setEditingCourse] = useState<CurriculumCourse | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Add / Edit
  const [formCode, setFormCode] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState<CurriculumCourse['category']>('Agroforestry Foundations');
  const [formWeeks, setFormWeeks] = useState(4);
  const [formHours, setFormHours] = useState(30);
  const [formInstructor, setFormInstructor] = useState('Dr. Joseph Kimani');
  const [formLevel, setFormLevel] = useState<CurriculumCourse['level']>('Foundational');
  const [formDesc, setFormDesc] = useState('');
  const [formAudience, setFormAudience] = useState('');

  const openAddModal = () => {
    setEditingCourse(null);
    setFormCode(`FFTC-${courses.length + 1}01`);
    setFormTitle('');
    setFormSubtitle('');
    setFormCategory('Agroforestry Foundations');
    setFormWeeks(4);
    setFormHours(30);
    setFormInstructor('Dr. Joseph Kimani');
    setFormLevel('Foundational');
    setFormDesc('');
    setFormAudience('Smallholder farmers and tree growers in Nyandarua County.');
    setIsAddModalOpen(true);
  };

  const openEditModal = (c: CurriculumCourse) => {
    setEditingCourse(c);
    setFormCode(c.code);
    setFormTitle(c.title);
    setFormSubtitle(c.subtitle);
    setFormCategory(c.category);
    setFormWeeks(c.durationWeeks);
    setFormHours(c.creditHours);
    setFormInstructor(c.instructor);
    setFormLevel(c.level);
    setFormDesc(c.description);
    setFormAudience(c.targetAudience);
    setIsAddModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingCourse) {
      updateCourse(editingCourse.id, {
        code: formCode,
        title: formTitle,
        subtitle: formSubtitle,
        category: formCategory,
        durationWeeks: Number(formWeeks),
        creditHours: Number(formHours),
        instructor: formInstructor,
        level: formLevel,
        description: formDesc,
        targetAudience: formAudience,
      });
    } else {
      const newCourse: Partial<CurriculumCourse> = {
        id: `course-${Date.now()}`,
        code: formCode || `CFF-${Math.floor(100 + Math.random() * 900)}`,
        title: formTitle,
        subtitle: formSubtitle || 'Practical Agroforestry Curriculum',
        category: formCategory,
        durationWeeks: Number(formWeeks),
        creditHours: Number(formHours),
        instructor: formInstructor,
        level: formLevel,
        description: formDesc,
        targetAudience: formAudience,
        enrolledCount: 0,
        bannerImage: '/src/assets/images/trainees_tree_planting_1791669542766.jpg',
        modules: [
          {
            id: `mod-${Date.now()}-1`,
            moduleNumber: 1,
            title: `${formTitle}: Core Unit 1`,
            hours: Math.round(Number(formHours) / 2) || 10,
            icon: 'Trees',
            color: 'emerald',
            overview: `Introductory practical and theoretical competencies for ${formTitle}.`,
            learningObjectives: ['Define key principles', 'Execute field standard practices', 'Comply with TVETA standards'],
            keyConcepts: ['Foundation concepts', 'Tools & safety', 'Field documentation'],
            units: [
              {
                id: `u-${Date.now()}-1`,
                unitNumber: 'Unit 1.1',
                title: 'Core Fundamentals',
                summary: 'Comprehensive instruction on fundamentals.',
                keyPoints: ['Scientific backing', 'Practical smallholder applications'],
                fieldTip: 'Ensure field recording notebook is updated daily.'
              }
            ],
            practicalActivityTitle: 'Practical Field Competency Drill',
            practicalActivityInstructions: ['Complete field equipment audit', 'Conduct plot demonstration'],
            expectedCompetency: 'Demonstrated mastery of core procedure',
            takeHomeMessages: ['Quality execution yields sustainable tree assets.'],
          }
        ]
      };
      addCourse(newCourse as CurriculumCourse);
    }
    setIsAddModalOpen(false);
  };

  // Filter learners
  const filteredLearners = learners.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchLearner.toLowerCase()) ||
      l.email.toLowerCase().includes(searchLearner.toLowerCase()) ||
      l.county.toLowerCase().includes(searchLearner.toLowerCase());
    const matchesCourse =
      selectedCourseFilter === 'all' || l.enrolledCourses.includes(selectedCourseFilter);
    return matchesSearch && matchesCourse;
  });

  // Filter certificates
  const filteredCertificates = certificatesRegistry.filter((c) => {
    return (
      c.recipientName.toLowerCase().includes(searchCert.toLowerCase()) ||
      c.certNumber.toLowerCase().includes(searchCert.toLowerCase()) ||
      c.courseName.toLowerCase().includes(searchCert.toLowerCase())
    );
  });

  const totalEnrollments = learners.reduce((sum, l) => sum + l.enrolledCourses.length, 0);

  return (
    <div className="space-y-6">
      {/* Admin Status & Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/80 border border-purple-500/50 text-xs font-bold text-purple-200">
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              <span>SYSTEM ADMINISTRATOR CONTROL PANEL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              FFTC Curriculum Administration & Registry
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
              Logged in as <strong>{currentUser?.name || 'Dr. Joseph Kimani'}</strong> ({currentUser?.email || 'admin@fftc.or.ke'}). Add, modify, and monitor curriculum offerings, view registered student records, and audit awarded certificates.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Curriculum</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Curriculums Active</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {courses.length}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
            <span>TVETA & TGAN Approved</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Registered Learners</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {learners.length}
          </div>
          <div className="text-[11px] text-blue-600 mt-1 font-medium">
            Across 5 Counties
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Enrollments</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {totalEnrollments}
          </div>
          <div className="text-[11px] text-amber-600 mt-1 font-medium">
            Active Course Seats
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Certificates Awarded</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {certificatesRegistry.length}
          </div>
          <div className="text-[11px] text-purple-600 mt-1 font-medium">
            Verified Credentials
          </div>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl overflow-x-auto scrollbar-none px-2 pt-2 gap-2 shadow-xs">
        <button
          onClick={() => setActiveAdminSubTab('curriculums')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
            activeAdminSubTab === 'curriculums'
              ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <span>Curriculums & Modules ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('enrollments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
            activeAdminSubTab === 'enrollments'
              ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-blue-700" />
          <span>Learner Enrollment Records ({learners.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('certificates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
            activeAdminSubTab === 'certificates'
              ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-purple-700" />
          <span>Awarded Certificates Registry ({certificatesRegistry.length})</span>
        </button>
      </div>

      {/* TAB 1: CURRICULUMS & COURSES MANAGEMENT */}
      {activeAdminSubTab === 'curriculums' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Official FFTC Training Curriculums
              </h3>
              <p className="text-xs text-slate-500">
                Administrators can create new curricula, modify syllabi, edit credit hours, and adjust learning objectives.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Curriculum</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => {
              const enrolledLearnersCount = learners.filter((l) =>
                l.enrolledCourses.includes(course.id)
              ).length;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Course Card Header with Banner */}
                    <div className="relative h-32 bg-slate-900 overflow-hidden">
                      <img
                        src={course.bannerImage}
                        alt={course.title}
                        className="w-full h-full object-cover opacity-60"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[10px] font-mono shadow-xs">
                          {course.code}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-200 text-[10px] font-semibold border border-emerald-700/60 backdrop-blur-xs">
                          {course.level}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2.5 right-2.5">
                        <h4 className="text-sm font-bold text-white leading-tight drop-shadow-sm truncate">
                          {course.title}
                        </h4>
                        <p className="text-[10px] text-emerald-300 truncate">
                          {course.category}
                        </p>
                      </div>
                    </div>

                    {/* Course Metadata Body */}
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Credit Hours</span>
                          <span className="font-bold text-slate-800">{course.creditHours} Hours ({course.durationWeeks} Wks)</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Modules Count</span>
                          <span className="font-bold text-slate-800">{course.modules.length} Modules</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Instructor</span>
                          <span className="font-bold text-slate-800 truncate block">{course.instructor}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Registered Students</span>
                          <span className="font-bold text-emerald-700">{enrolledLearnersCount} Enrolled</span>
                        </div>
                      </div>

                      {/* Modules Accordion Summary */}
                      <div>
                        <div className="text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                          <span>Syllabus Modules:</span>
                          <span className="text-[10px] text-slate-400">{course.modules.length} items</span>
                        </div>
                        <ul className="text-[11px] text-slate-600 space-y-1 max-h-24 overflow-y-auto pr-1">
                          {course.modules.map((m, mIdx) => (
                            <li key={m.id} className="flex items-center gap-1.5 truncate">
                              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[9px] shrink-0">
                                {mIdx + 1}
                              </span>
                              <span className="truncate">{m.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditModal(course)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Curriculum</span>
                    </button>

                    {courses.length > 1 && (
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete course ${course.title}?`)) {
                            deleteCourse(course.id);
                          }
                        }}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ENROLLED LEARNERS & REGISTRATION RECORDS */}
      {activeAdminSubTab === 'enrollments' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Learner Registration & Course Enrollment Database
                </h3>
                <p className="text-xs text-slate-500">
                  Total of {learners.length} registered students with {totalEnrollments} total course seats.
                </p>
              </div>

              {/* Course Registration Counter Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {courses.map((c) => {
                  const count = learners.filter((l) => l.enrolledCourses.includes(c.id)).length;
                  return (
                    <div
                      key={c.id}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                    >
                      <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                        {c.code}
                      </span>
                      <span>{count} learners</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchLearner}
                  onChange={(e) => setSearchLearner(e.target.value)}
                  placeholder="Search by learner name, email, or county..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedCourseFilter}
                  onChange={(e) => setSelectedCourseFilter(e.target.value)}
                  className="w-full sm:w-48 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="all">All Enrolled Courses</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} ({c.title})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Learners Table (Responsive) */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 sm:p-4">Learner Profile</th>
                    <th className="p-3 sm:p-4">Location & Farm</th>
                    <th className="p-3 sm:p-4">Enrolled Courses</th>
                    <th className="p-3 sm:p-4">Modules Completed</th>
                    <th className="p-3 sm:p-4">Practicals</th>
                    <th className="p-3 sm:p-4">Certificate Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLearners.map((lrn) => {
                    const hasCert = !!lrn.certificateEarned;
                    return (
                      <tr key={lrn.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 sm:p-4">
                          <div className="font-bold text-slate-900 leading-tight">
                            {lrn.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {lrn.email}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {lrn.phone} · <span className="text-emerald-700 font-medium">{lrn.occupation}</span>
                          </div>
                        </td>

                        <td className="p-3 sm:p-4">
                          <div className="text-slate-800 font-medium">
                            {lrn.county}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {lrn.location}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {lrn.farmSizeAcres} Acres Holding
                          </div>
                        </td>

                        <td className="p-3 sm:p-4">
                          <div className="flex flex-wrap gap-1">
                            {lrn.enrolledCourses.map((cId) => {
                              const crs = courses.find((c) => c.id === cId);
                              return (
                                <span
                                  key={cId}
                                  className="inline-block px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px]"
                                >
                                  {crs?.code || cId}
                                </span>
                              );
                            })}
                          </div>
                        </td>

                        <td className="p-3 sm:p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">
                              {lrn.completedModules.length} Modules
                            </span>
                          </div>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${Math.min(100, (lrn.completedModules.length / 7) * 100)}%` }}
                            />
                          </div>
                        </td>

                        <td className="p-3 sm:p-4">
                          <div className="space-y-1 text-[11px]">
                            <span
                              className={`inline-flex items-center gap-1 font-semibold ${
                                lrn.practicalSubmitted ? 'text-emerald-700' : 'text-slate-400'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{lrn.practicalSubmitted ? 'Field Work ✓' : 'Pending'}</span>
                            </span>
                            <div className="text-[10px] text-slate-500">
                              Plan: {lrn.actionPlanSubmitted ? 'Submitted' : 'Draft'}
                            </div>
                          </div>
                        </td>

                        <td className="p-3 sm:p-4">
                          {hasCert ? (
                            <div className="space-y-0.5">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                                <Award className="w-3 h-3 text-purple-600" />
                                <span>{lrn.certificateEarned?.grade} ({lrn.certificateEarned?.score}%)</span>
                              </span>
                              <div className="text-[9px] font-mono text-slate-400">
                                {lrn.certificateEarned?.certNumber}
                              </div>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">
                              In Progress
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AWARDED CERTIFICATES REGISTRY */}
      {activeAdminSubTab === 'certificates' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Official FFTC Accredited Certificates Registry
              </h3>
              <p className="text-xs text-slate-500">
                Official TVETA & TGAN validated certificates awarded to certified smallholders and practitioners.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCert}
                onChange={(e) => setSearchCert(e.target.value)}
                placeholder="Search by recipient or cert number..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 sm:p-4">Cert Number & Issue Date</th>
                    <th className="p-3 sm:p-4">Recipient Name</th>
                    <th className="p-3 sm:p-4">Course Accredited</th>
                    <th className="p-3 sm:p-4">Weighted Score</th>
                    <th className="p-3 sm:p-4">Award Grade</th>
                    <th className="p-3 sm:p-4">Validation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCertificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 sm:p-4">
                        <div className="font-mono font-bold text-emerald-900">
                          {cert.certNumber}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>Issued: {cert.issueDate}</span>
                        </div>
                      </td>

                      <td className="p-3 sm:p-4">
                        <div className="font-bold text-slate-900">
                          {cert.recipientName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {cert.recipientEmail}
                        </div>
                      </td>

                      <td className="p-3 sm:p-4">
                        <div className="font-semibold text-slate-800">
                          {cert.courseName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {cert.issuer}
                        </div>
                      </td>

                      <td className="p-3 sm:p-4">
                        <div className="text-sm font-extrabold text-slate-900">
                          {cert.score}%
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Comprehensive
                        </div>
                      </td>

                      <td className="p-3 sm:p-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            cert.grade === 'Distinction'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : cert.grade === 'Credit'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-blue-100 text-blue-900 border border-blue-300'
                          }`}
                        >
                          {cert.grade}
                        </span>
                      </td>

                      <td className="p-3 sm:p-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Official {cert.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Curriculum Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in duration-200">
            <div className="bg-emerald-950 text-white p-5 border-b border-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">
                    {editingCourse ? 'Modify Existing Curriculum' : 'Add New Training Curriculum'}
                  </h3>
                  <p className="text-xs text-emerald-300">
                    Farm Forestry Training Center (FFTC) Academic Board
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="e.g. CFFB-101"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Curriculum Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Sustainable Silviculture & Sawlog Management"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Subtitle / Specialization
                </label>
                <input
                  type="text"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="e.g. 5-Module Advanced Timber Quality Certification"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Agroforestry Foundations">Agroforestry Foundations</option>
                    <option value="Nursery Management">Nursery Management</option>
                    <option value="Timber & Silviculture">Timber & Silviculture</option>
                    <option value="Forestry Business & Carbon">Forestry Business & Carbon</option>
                    <option value="Soil & Water Conservation">Soil & Water Conservation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Credit Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formHours}
                    onChange={(e) => setFormHours(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Duration (Weeks)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formWeeks}
                    onChange={(e) => setFormWeeks(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Lead Instructor / Specialist
                  </label>
                  <input
                    type="text"
                    value={formInstructor}
                    onChange={(e) => setFormInstructor(e.target.value)}
                    placeholder="e.g. Dr. Joseph Kimani"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Competency Level
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Foundational">Foundational</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Curriculum Overview & Scope *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Detail the competencies, practical field exercises, and smallholder agroforestry applications..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={formAudience}
                  onChange={(e) => setFormAudience(e.target.value)}
                  placeholder="e.g. Smallholder farmers, lead growers, and extension officers in Nyandarua"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingCourse ? 'Save Changes' : 'Publish Curriculum'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
