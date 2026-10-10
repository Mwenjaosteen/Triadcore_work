import React, { useState } from 'react';
import { useFFTC } from '../../context/FFTCContext';
import { PhotoSlider } from '../common/PhotoSlider';
import { CurriculumCourse, TrainingModule } from '../../types/fftc';
import {
  Trees,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Award,
  ChevronRight,
  BookOpen,
  Lightbulb,
  AlertCircle,
  Users,
  ShieldCheck,
  Check,
  LogIn,
  GraduationCap,
  Layers,
} from 'lucide-react';

const MODULE_QUIZZES: Record<string, { question: string; options: string[]; answerIndex: number; explanation: string }[]> = {
  'mod-1': [
    {
      question: 'What is the primary definition of farm forestry?',
      options: [
        'Converting 100% of agricultural land into an unmanaged forest',
        'Growing and managing trees on farms alongside crops and livestock',
        'Felling all indigenous trees to plant only industrial timber',
        'Planting trees only along public highways and forest reserves'
      ],
      answerIndex: 1,
      explanation: 'Farm forestry is the integration of trees into farms alongside crops and livestock without converting the entire farm into a forest.'
    },
    {
      question: 'Why are trees described as a "Multi-Purpose Bank" in farm forestry?',
      options: [
        'Because trees must be deposited in commercial financial vaults',
        'Because trees provide seasonal small loans from the government',
        'Because trees accumulate standing value and can be harvested when major capital is needed',
        'Because tree leaves can be used as legal paper currency'
      ],
      answerIndex: 2,
      explanation: 'Trees accumulate wood biomass volume over years, providing capital for major needs like school fees or medical expenses.'
    },
    {
      question: 'Which of the following is NOT one of the three main tree integration typologies?',
      options: [
        'Boundary Planting along farm perimeters',
        'Intercropping / Alley Cropping with food crops',
        'Clear-felling natural water catchment basins',
        'Woodlots on dedicated corners of the farm'
      ],
      answerIndex: 2,
      explanation: 'Clear-felling water catchment areas causes severe soil erosion and is illegal under Kenyan forestry regulations.'
    }
  ],
  'mod-2': [
    {
      question: 'What does the principle "Right Tree, Right Place" mean in farm forestry?',
      options: [
        'Planting any available exotic seedling regardless of soil type',
        'Selecting tree species based on altitude, rainfall, soil, space, and farm purpose',
        'Planting all trees exactly 1 meter from the farmhouse wall',
        'Only planting Eucalyptus along freshwater river banks'
      ],
      answerIndex: 1,
      explanation: 'Species selection must align with local climate, soil drainage, rainfall patterns, and the intended household objective.'
    },
    {
      question: 'What is the practice of "Gapping"?',
      options: [
        'Leaving large gaps of empty unplanted land across the farm',
        'Cutting gaps in the forest canopy to let sunlight through',
        'Replacing seedlings that died shortly after planting to maintain full stocking',
        'Pruning tree branches to leave gaps for bird nesting'
      ],
      answerIndex: 2,
      explanation: 'Gapping replaces seedlings that failed to establish in the first 2 months so that no land is wasted.'
    },
    {
      question: 'What is the recommended size for standard planting holes on smallholder farms?',
      options: [
        '10 cm x 10 cm x 10 cm shallow slit',
        '45 cm x 45 cm x 45 cm (or at least twice root ball width and depth)',
        '2 meters deep and 1 meter wide',
        'No hole is needed; seedlings should be placed on bare surface grass'
      ],
      answerIndex: 1,
      explanation: 'A 45cm cube allows roots to expand easily in loosened topsoil mixed with organic manure.'
    }
  ],
  'mod-3': [
    {
      question: 'What is the "One-Third Rule" in tree pruning?',
      options: [
        'Only prune trees that are more than 33 meters tall',
        'Never remove more than one-third (33%) of the live green canopy in a single season',
        'Prune one tree out of every three trees in the woodlot',
        'Leave one-third of the branch stub protruding from the trunk'
      ],
      answerIndex: 1,
      explanation: 'Removing more than one-third of green foliage starves the tree of photosynthetic energy and severely slows growth.'
    },
    {
      question: 'How should a coppicing cut be executed on a felled tree stump?',
      options: [
        'Flat horizontal cut level with the mud',
        'Torn with an axe to create splintered wood',
        'Clean cut at an outward sloping angle close to the base so water drains off',
        'Burn the top of the stump with diesel'
      ],
      answerIndex: 2,
      explanation: 'A clean sloping cut sheds rainwater, preventing fungal rot from entering the stump cambium.'
    }
  ],
  'mod-4': [
    {
      question: 'What is biochar and why is it valuable for soil health?',
      options: [
        'Burned ash that washes away with rainwater',
        'Carbon-rich porous material made by controlled low-oxygen pyrolysis that boosts soil moisture and nutrient retention',
        'A chemical pesticide used to kill termites',
        'Raw unburned tree sawdust that rots slowly'
      ],
      answerIndex: 1,
      explanation: 'Biochar provides stable microscopic pores that retain water and microbes in degraded soils for decades.'
    },
    {
      question: 'Why must raw biochar be "charged" with organic manure before applying to crops?',
      options: [
        'To make it change color from black to brown',
        'Because uncharged biochar temporarily absorbs available nitrogen from crop roots',
        'To make it burn faster when heated',
        'It is illegal to apply raw biochar in Kenya'
      ],
      answerIndex: 1,
      explanation: 'Raw biochar has high absorbent capacity. Inoculating it with manure pre-loads it with nutrients so it immediately feeds crops.'
    }
  ],
  'mod-5': [
    {
      question: 'How do smallholder farmers benefit from collective marketing through TGAN?',
      options: [
        'By surrendering all farm profits to private traders',
        'By combining tree volumes to increase bargaining power and access lucrative direct buyers',
        'By paying higher road transit taxes',
        'By waiting for middlemen to set prices arbitrarily'
      ],
      answerIndex: 1,
      explanation: 'Aggregating timber and poles enables farmers to negotiate volume contracts directly with processors like KPLC or sawmills.'
    }
  ],
  'mod-6': [
    {
      question: 'Which authority in Kenya issues legal Movement Permits for transporting private farm timber?',
      options: [
        'County Revenue Collector only',
        'Kenya Forest Service (KFS) Forest Station / Sub-County Forest Officer',
        'Local public transport SACCO',
        'Ministry of Sports and Culture'
      ],
      answerIndex: 1,
      explanation: 'Under the Forest Conservation and Management Act, commercial timber transport requires an official KFS movement permit.'
    }
  ],
  'mod-7': [
    {
      question: 'What is the purpose of the 12-Month Farm Forestry Action Plan?',
      options: [
        'To eliminate all food crops from the farm',
        'To align tree sourcing, planting, weeding, and pruning activities with local seasonal rains and labor',
        'To apply for bank loans without doing any planting',
        'To replace all annual rainfall with borehole irrigation'
      ],
      answerIndex: 1,
      explanation: 'The action plan aligns forestry management with agricultural seasons (Jan-Feb to Nov-Dec) ensuring high seedling survival.'
    }
  ]
};

export const CurriculumView: React.FC = () => {
  const {
    currentUser,
    isLoggedIn,
    isAdmin,
    courses,
    enrolInCourse,
    isEnrolled,
    selectedCourseId,
    setSelectedCourseId,
    selectedModuleId,
    setSelectedModuleId,
    setActiveTab,
    setAuthModalOpen,
    setAuthModalCourseToEnroll,
    completeModuleQuiz,
    isModuleCompleted,
  } = useFFTC();

  const [activeQuizModule, setActiveQuizModule] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [enrollmentSuccessMessage, setEnrollmentSuccessMessage] = useState<string | null>(null);

  // Active selected course
  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const activeModules = currentCourse?.modules || [];
  const currentModule = activeModules.find((m) => m.id === selectedModuleId) || activeModules[0] || {
    id: 'placeholder',
    moduleNumber: 1,
    title: 'Introductory Module',
    hours: 5,
    overview: 'Module overview',
    learningObjectives: [],
    keyConcepts: [],
    units: [],
    practicalActivityTitle: 'Field Drill',
    practicalActivityInstructions: [],
    expectedCompetency: 'Competency benchmark',
    takeHomeMessages: [],
    icon: 'Trees',
    color: 'emerald',
  };

  const quizQuestions = MODULE_QUIZZES[currentModule.id] || [];

  const handleEnrolClick = (course: CurriculumCourse) => {
    if (!isLoggedIn) {
      setAuthModalCourseToEnroll(course.id);
      setAuthModalOpen(true);
      return;
    }

    enrolInCourse(course.id);
    setEnrollmentSuccessMessage(`Congratulations! You are now enrolled in ${course.title}.`);
    setTimeout(() => setEnrollmentSuccessMessage(null), 4000);
  };

  const handleStartQuiz = () => {
    if (!isLoggedIn) {
      setAuthModalCourseToEnroll(currentCourse.id);
      setAuthModalOpen(true);
      return;
    }
    setActiveQuizModule(currentModule.id);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleGradeQuiz = () => {
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answerIndex) correct++;
    });
    const score = Math.round((correct / Math.max(quizQuestions.length, 1)) * 100);
    completeModuleQuiz(currentModule.id, score);
    setQuizSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. PHOTO SLIDER AT THE VERY TOP OF THE FIRST PAGE (SLIDING TO THE LEFT) */}
      <PhotoSlider />

      {/* Enrollment Alert Notification */}
      {enrollmentSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs sm:text-sm flex items-center justify-between shadow-md animate-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{enrollmentSuccessMessage}</span>
          </div>
          <button
            onClick={() => setEnrollmentSuccessMessage(null)}
            className="text-emerald-800 hover:text-emerald-950 text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-emerald-900/30 bg-emerald-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/src/assets/images/trainees_tree_planting_1791669542766.jpg"
            alt="Nyandarua Farm Forestry"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/50" />

        <div className="relative p-6 sm:p-8 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Farm Forestry Training Center (FFTC) · Nyandarua County, Kenya</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Empowering Rural Communities Through Sustainable Farm Forestry
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Welcome to the official competency-based e-learning system of the <strong>Farm Forestry Training Center (FFTC)</strong>. Learn step-by-step how to establish farm tree nurseries, manage timber woodlots, boost soil moisture with biochar, and maximize family income through collective marketing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              {courses.length} Accredited Curriculums
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Trees className="w-4 h-4 text-emerald-400" />
              Hands-On Practical Field Drills
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              TVETA & TGAN Certification
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {!isLoggedIn ? (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In to Enrol in Courses</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-900/90 border border-emerald-700/60 px-3.5 py-2 rounded-xl text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Logged in as <strong>{currentUser?.name || 'Learner'}</strong> ({currentUser?.enrolledCourses?.length || 0} Enrolled Courses)</span>
              </div>
            )}

            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-100 font-bold text-xs sm:text-sm border border-purple-500 shadow-md transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-purple-300" />
                <span>Open Admin Portal (Manage Curriculums)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. COURSE CURRICULUM CATALOG WITH ENROLLMENT REQUIREMENT */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-700" />
              <span>Available Training Curriculums</span>
            </h2>
            <p className="text-xs text-slate-500">
              Select and enrol in a curriculum to access module units, field practical exercises, and certification.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{courses.length} Curriculums Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => {
            const userIsEnrolled = isEnrolled(course.id);
            const isCurrentlySelected = selectedCourseId === course.id;

            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between shadow-xs ${
                  isCurrentlySelected
                    ? 'border-emerald-700 ring-2 ring-emerald-700/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Course Header Banner */}
                  <div className="relative h-36 bg-slate-900 overflow-hidden">
                    <img
                      src={course.bannerImage}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-65"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] font-mono shadow-xs">
                        {course.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-200 text-[10px] font-semibold border border-emerald-700/60 backdrop-blur-xs">
                        {course.level}
                      </span>
                    </div>

                    {userIsEnrolled && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                        <Check className="w-3 h-3" />
                        <span>Enrolled</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-base font-extrabold text-white leading-tight drop-shadow-sm">
                        {course.title}
                      </h3>
                      <p className="text-[11px] text-emerald-300 truncate">
                        {course.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Hours & Weeks</span>
                        <span className="font-bold text-slate-800">{course.creditHours} Hours ({course.durationWeeks} Wks)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Curriculum Units</span>
                        <span className="font-bold text-slate-800">{course.modules.length} Modules</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Specialist</span>
                        <span className="font-bold text-slate-800 truncate block">{course.instructor}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Student Registrations</span>
                        <span className="font-bold text-emerald-700">{course.enrolledCount} Enrolled</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Enrollment & Selection Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    {userIsEnrolled ? (
                      <button
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          if (course.modules[0]) {
                            setSelectedModuleId(course.modules[0].id);
                          }
                        }}
                        className={`w-full py-2 px-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                          isCurrentlySelected
                            ? 'bg-emerald-800 text-white'
                            : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{isCurrentlySelected ? 'Viewing Syllabus' : 'Open Course Modules'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnrolClick(course)}
                        className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>{isLoggedIn ? 'Enrol in this Course' : 'Log In to Enrol'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE COURSE MODULE NAVIGATOR & STUDY WORKSPACE */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-emerald-100">{currentCourse.code}</span>
              <span>{currentCourse.title}</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              Curriculum Modules & Competency Units ({activeModules.length} Modules)
            </h3>
          </div>

          {!isEnrolled(currentCourse.id) && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Enrol in this course to take quizzes & earn certificates</span>
            </div>
          )}
        </div>

        {/* Scrollable Module Stepper Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {activeModules.map((mod) => {
            const isSelected = mod.id === selectedModuleId;
            const isDone = isModuleCompleted(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  setActiveQuizModule(null);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 min-h-[44px] border ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isSelected
                      ? 'bg-amber-400 text-emerald-950'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isDone ? '✓' : mod.moduleNumber}
                </div>
                <div className="text-left">
                  <span className="block leading-tight">{mod.title}</span>
                  <span
                    className={`text-[10px] block font-mono ${
                      isSelected ? 'text-emerald-300' : 'text-slate-400'
                    }`}
                  >
                    {mod.hours} Credit Hours
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIVE MODULE STUDY CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                Module {currentModule.moduleNumber} of {activeModules.length}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">
                {currentModule.hours} Recommended Study Hours
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {currentModule.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleStartQuiz}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>Take Competency Quiz</span>
            </button>
          </div>
        </div>

        {/* Module Overview & Nyandarua Analogy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Module Overview
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentModule.overview}
              </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Core Learning Objectives</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {currentModule.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Analogy & Field Wisdom Card */}
          {currentModule.analogyTitle && (
            <div className="bg-amber-50/70 rounded-xl p-4 sm:p-5 border border-amber-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Field Analogy: {currentModule.analogyTitle}</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed italic">
                  "{currentModule.analogyDescription}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-900 font-medium">
                TGAN Nyandarua Training Methodology
              </div>
            </div>
          )}
        </div>

        {/* Module Units Breakdown */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Curriculum Unit Lessons</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentModule.units.map((unit) => (
              <div
                key={unit.id}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-bold">
                    {unit.unitNumber}
                  </span>
                  {unit.fieldTip && (
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-semibold border border-amber-200/60">
                      💡 Field Tip
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {unit.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {unit.summary}
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Essential Key Points:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {unit.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">›</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {unit.fieldTip && (
                  <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/60 text-xs text-emerald-900 italic">
                    <strong>Practitioner Note:</strong> {unit.fieldTip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Practical Field Exercise Card */}
        <div className="bg-emerald-950 text-white rounded-xl p-6 sm:p-7 border border-emerald-900 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800 pb-3">
            <div className="flex items-center gap-2">
              <Trees className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-base sm:text-lg">
                {currentModule.practicalActivityTitle}
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('exercises')}
              className="text-xs text-amber-300 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Open Field Tools Workspace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-emerald-100">
            <div>
              <div className="font-bold text-emerald-200 uppercase tracking-wider mb-2">
                Field Execution Protocol:
              </div>
              <ol className="space-y-1.5 list-decimal list-inside text-emerald-100">
                {currentModule.practicalActivityInstructions.map((inst, i) => (
                  <li key={i} className="leading-relaxed">{inst}</li>
                ))}
              </ol>
            </div>

            <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-800 space-y-2">
              <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                Expected TVETA Competency Benchmark:
              </div>
              <p className="text-xs text-white leading-relaxed">
                {currentModule.expectedCompetency}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Competency Quiz Modal */}
      {activeQuizModule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in duration-150">
            <div className="bg-emerald-950 text-white p-5 border-b border-emerald-900 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Module {currentModule.moduleNumber} Competency Assessment
                </div>
                <h3 className="text-lg font-bold">
                  {currentModule.title} Knowledge Check
                </h3>
              </div>
              <button
                onClick={() => setActiveQuizModule(null)}
                className="p-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2.5 pb-5 border-b border-slate-100 last:border-none">
                  <div className="font-bold text-sm text-slate-900">
                    {qIdx + 1}. {q.question}
                  </div>

                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      const isCorrect = q.answerIndex === oIdx;

                      let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                      if (isSelected) {
                        btnStyle = 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold';
                      }
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-600 bg-emerald-100 text-emerald-950 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(qIdx, oIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && (
                            <span className="text-emerald-700 font-bold text-xs">✓ Correct</span>
                          )}
                          {quizSubmitted && isSelected && !isCorrect && (
                            <span className="text-rose-600 font-bold text-xs">✗ Incorrect</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100 italic">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {quizSubmitted ? 'Score recorded into learner ledger' : 'Select one answer per question'}
              </span>

              {quizSubmitted ? (
                <button
                  onClick={() => setActiveQuizModule(null)}
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              ) : (
                <button
                  onClick={handleGradeQuiz}
                  disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  Submit & Record Score
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
