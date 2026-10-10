import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TrainingModule,
  LearnerProfile,
  ActionPlan,
  FarmMapPlan,
  CompetencyItem,
  CostingItem,
  RevenueItem,
  CurriculumCourse,
  UserAccount,
  AwardedCertificate,
  UserRole,
} from '../types/fftc';
import {
  CFFB_MODULES,
  INITIAL_COMPETENCIES,
  INITIAL_COURSES,
  INITIAL_USERS,
  INITIAL_CERTIFICATES,
} from '../data/curriculumData';

export type FFTCTabId = 'curriculum' | 'exercises' | 'assessment' | 'manuals' | 'policy' | 'certificate' | 'admin';

interface FFTCContextType {
  // Current user & authentication
  currentUser: UserAccount | null;
  learner: UserAccount;
  updateLearner: (data: Partial<UserAccount>) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => boolean;
  register: (userData: Partial<UserAccount>) => void;
  logout: () => void;
  learners: UserAccount[];

  // Course & Curriculum catalog
  courses: CurriculumCourse[];
  enrolInCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  addCourse: (course: CurriculumCourse) => void;
  updateCourse: (id: string, updates: Partial<CurriculumCourse>) => void;
  deleteCourse: (id: string) => void;

  // Active navigation
  activeTab: FFTCTabId;
  setActiveTab: (tab: FFTCTabId) => void;
  selectedModuleId: string;
  setSelectedModuleId: (id: string) => void;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;

  // Auth Modal trigger
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalCourseToEnroll: string | null;
  setAuthModalCourseToEnroll: (id: string | null) => void;

  // Certificates Registry
  certificatesRegistry: AwardedCertificate[];

  // Practical Tool States
  farmMap: FarmMapPlan;
  setFarmMap: React.Dispatch<React.SetStateAction<FarmMapPlan>>;
  addMapElement: (element: Omit<FarmMapPlan['elements'][0], 'id'>) => void;
  removeMapElement: (id: string) => void;

  actionPlan: ActionPlan;
  updateActionPlan: (data: Partial<ActionPlan>) => void;
  updateActionPlanRow: (index: number, updates: Partial<ActionPlan['rows'][0]>) => void;

  competencies: CompetencyItem[];
  toggleCompetency: (id: string, status: 'competent' | 'needs_practice') => void;

  // Quizzes & Completion
  completeModuleQuiz: (moduleId: string, score: number) => void;
  isModuleCompleted: (moduleId: string) => boolean;

  // Costing calculation model
  costingItems: CostingItem[];
  setCostingItems: React.Dispatch<React.SetStateAction<CostingItem[]>>;
  revenueItems: RevenueItem[];
  setRevenueItems: React.Dispatch<React.SetStateAction<RevenueItem[]>>;

  // Assessment results & Certificate Issuance
  calculateFinalGrade: () => {
    writtenScore: number;
    practicalScore: number;
    planScore: number;
    participationScore: number;
    totalWeighted: number;
    grade: 'Distinction' | 'Credit' | 'Pass' | 'Needs Practice';
  };

  issueCertificate: () => void;
}

const DEFAULT_MAP: FarmMapPlan = {
  farmName: 'Green Crest Demonstration Smallholding',
  farmerName: 'Wanjiku Mary Kariuki',
  location: 'Ol\'Kalou, Nyandarua',
  farmSizeAcres: 2.5,
  notes: 'High-altitude plot (2,400m ASL). Moderate wind exposure from Aberdare ranges, sandy-loam soil.',
  elements: [
    { id: 'el-1', type: 'house', label: 'Homestead & Water Tank', x: 20, y: 30, notes: 'Includes rooftop rain gutter' },
    { id: 'el-2', type: 'crops', label: 'Potatoes & Cabbage Plot', x: 50, y: 35, notes: 'Rotational horticulture' },
    { id: 'el-3', type: 'boundary_trees', label: 'Grevillea Windbreak (West)', x: 10, y: 50, notes: '40 trees spaced at 2m' },
    { id: 'el-4', type: 'water', label: 'Farm Earth Pan / Pond', x: 75, y: 25, notes: 'Runoff catchment' },
    { id: 'el-5', type: 'nursery', label: 'Demonstration Tree Nursery', x: 25, y: 65, notes: '500 seedlings capacity' },
    { id: 'el-6', type: 'woodlot', label: 'Cypress Woodlot Corner', x: 80, y: 75, notes: '0.5 acre for timber' },
    { id: 'el-7', type: 'erosion_zone', label: 'Steep Runoff Gully (Fanya Juu)', x: 45, y: 80, notes: 'Needs Calliandra stabilization' }
  ]
};

const DEFAULT_ACTION_PLAN: ActionPlan = {
  farmerName: 'Wanjiku Mary Kariuki',
  farmLocation: 'Ol\'Kalou, Nyandarua County',
  farmSize: '2.5 Acres',
  mainFarmActivities: 'Dairy farming, Shangi potato cultivation, agroforestry tree nurseries',
  rows: [
    {
      period: 'Jan – Feb',
      activity: 'Seed/seedling sourcing and species procurement',
      materialsTools: 'Certified seeds (KEFRI/TGAN), polybags, watering cans',
      responsiblePerson: 'Mary Kariuki & Family',
      status: 'Completed'
    },
    {
      period: 'Mar – Apr',
      activity: 'Nursery preparation, soil mixing & seed sowing',
      materialsTools: 'Topsoil, sand, well-cured cow manure (2:1:1 mix)',
      responsiblePerson: 'Lead Farmer',
      status: 'Completed'
    },
    {
      period: 'Apr – May',
      activity: 'Site preparation, hole excavation (45cm³) & main rains planting',
      materialsTools: 'Jembe, tape measure, compost, 250 tree seedlings',
      responsiblePerson: 'Farmer & Youth Labor',
      status: 'In Progress'
    },
    {
      period: 'May – Jun',
      activity: 'Weeding, mulching, biochar dressing & pest monitoring',
      materialsTools: 'Panga, charged biochar, grass mulch',
      responsiblePerson: 'Mary Kariuki',
      status: 'Planned'
    },
    {
      period: 'Jul – Aug',
      activity: 'Gapping (replacing dead seedlings) & wind protection',
      materialsTools: '50 replacement seedlings, tree guards against livestock',
      responsiblePerson: 'Farm Manager',
      status: 'Planned'
    },
    {
      period: 'Sep – Oct',
      activity: 'Formative pruning of year-2 trees & short rains planting',
      materialsTools: 'Sharp pruning saw, disinfected loppers',
      responsiblePerson: 'Farmer',
      status: 'Planned'
    },
    {
      period: 'Nov – Dec',
      activity: 'Annual tree survival audit, ledger review & 2027 plan update',
      materialsTools: 'Farm record notebook, volume tape',
      responsiblePerson: 'Mary Kariuki',
      status: 'Planned'
    }
  ],
  treeProductionGoal: 'Establish 450 productive trees (200 Grevillea, 150 Cypress, 50 Calliandra fodder, 50 indigenous Prunus africana).',
  soilEnvironmentalGoal: 'Stabilize western slope terraces to halt soil washing, and apply 500kg of manure-charged biochar.',
  incomeBusinessGoal: 'Harvest 80 building poles by year 4 and supply 2,000 nursery seedlings to TGAN member farmers annually.',
  mainChallenge: 'Severe Aberdare frost in July and livestock intrusion during dry spells.'
};

const DEFAULT_COSTING: CostingItem[] = [
  { category: 'Establishment', item: 'Certified Tree Seedlings (350 stems)', quantity: 350, unitCostKES: 25, totalCostKES: 8750 },
  { category: 'Establishment', item: 'Hole Excavation (45cm cube labor)', quantity: 350, unitCostKES: 15, totalCostKES: 5250 },
  { category: 'Establishment', item: 'Composted Cattle Manure (bags)', quantity: 20, unitCostKES: 250, totalCostKES: 5000 },
  { category: 'Maintenance', item: 'Year 1 & 2 Weeding & Spot Mulch', quantity: 4, unitCostKES: 1500, totalCostKES: 6000 },
  { category: 'Maintenance', item: 'Formative Pruning & Tool Care', quantity: 2, unitCostKES: 1000, totalCostKES: 2000 },
  { category: 'Harvesting', item: 'Felling, Cross-Cutting & Debarking', quantity: 250, unitCostKES: 50, totalCostKES: 12500 }
];

const DEFAULT_REVENUE: RevenueItem[] = [
  { product: 'Poles & Posts', volume: '150 Construction Poles (Year 4)', unitPriceKES: 600, totalRevenueKES: 90000 },
  { product: 'Timber', volume: '100 Mature Sawlogs (Year 8)', unitPriceKES: 3500, totalRevenueKES: 350000 },
  { product: 'Fuelwood', volume: '40 Bundles of Thinnings & Prunings', unitPriceKES: 200, totalRevenueKES: 8000 },
  { product: 'Seedlings', volume: '1,200 Seedlings Sold from Nursery', unitPriceKES: 30, totalRevenueKES: 36000 },
  { product: 'Honey', volume: '30 kg Honey from Woodlot Apiary', unitPriceKES: 800, totalRevenueKES: 24000 }
];

const FFTCContext = createContext<FFTCContextType | undefined>(undefined);

export const FFTCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users state
  const [learners, setLearners] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('fftc_registered_learners');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Current active user (defaults to Mary Kariuki for seamless initial demo)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('fftc_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  // Courses catalog state
  const [courses, setCourses] = useState<CurriculumCourse[]>(() => {
    const saved = localStorage.getItem('fftc_courses_catalog');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  // Certificates Registry
  const [certificatesRegistry, setCertificatesRegistry] = useState<AwardedCertificate[]>(() => {
    const saved = localStorage.getItem('fftc_certificates_registry');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  // Active navigation
  const [activeTab, setActiveTab] = useState<FFTCTabId>('curriculum');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-cffb');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-1');

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalCourseToEnroll, setAuthModalCourseToEnroll] = useState<string | null>(null);

  // Practical Tools
  const [farmMap, setFarmMap] = useState<FarmMapPlan>(() => {
    const saved = localStorage.getItem('fftc_farm_map');
    return saved ? JSON.parse(saved) : DEFAULT_MAP;
  });

  const [actionPlan, setActionPlan] = useState<ActionPlan>(() => {
    const saved = localStorage.getItem('fftc_action_plan');
    return saved ? JSON.parse(saved) : DEFAULT_ACTION_PLAN;
  });

  const [competencies, setCompetencies] = useState<CompetencyItem[]>(() => {
    const saved = localStorage.getItem('fftc_competencies');
    return saved ? JSON.parse(saved) : INITIAL_COMPETENCIES;
  });

  const [costingItems, setCostingItems] = useState<CostingItem[]>(() => {
    const saved = localStorage.getItem('fftc_costing_items');
    return saved ? JSON.parse(saved) : DEFAULT_COSTING;
  });

  const [revenueItems, setRevenueItems] = useState<RevenueItem[]>(() => {
    const saved = localStorage.getItem('fftc_revenue_items');
    return saved ? JSON.parse(saved) : DEFAULT_REVENUE;
  });

  // Local storage auto sync
  useEffect(() => {
    localStorage.setItem('fftc_registered_learners', JSON.stringify(learners));
  }, [learners]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fftc_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fftc_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('fftc_courses_catalog', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('fftc_certificates_registry', JSON.stringify(certificatesRegistry));
  }, [certificatesRegistry]);

  useEffect(() => {
    localStorage.setItem('fftc_farm_map', JSON.stringify(farmMap));
  }, [farmMap]);

  useEffect(() => {
    localStorage.setItem('fftc_action_plan', JSON.stringify(actionPlan));
  }, [actionPlan]);

  useEffect(() => {
    localStorage.setItem('fftc_competencies', JSON.stringify(competencies));
  }, [competencies]);

  useEffect(() => {
    localStorage.setItem('fftc_costing_items', JSON.stringify(costingItems));
  }, [costingItems]);

  useEffect(() => {
    localStorage.setItem('fftc_revenue_items', JSON.stringify(revenueItems));
  }, [revenueItems]);

  // Authentication methods
  const isLoggedIn = currentUser !== null;
  const isAdmin = currentUser?.role === 'admin';

  const login = (email: string, _password?: string): boolean => {
    const trimmed = email.trim().toLowerCase();
    const found = learners.find((u) => u.email.toLowerCase() === trimmed);
    if (found) {
      setCurrentUser(found);
      setAuthModalOpen(false);

      // If user attempted to enroll before logging in, auto-enroll now
      if (authModalCourseToEnroll) {
        completeEnrollment(authModalCourseToEnroll, found);
        setAuthModalCourseToEnroll(null);
      }
      return true;
    }

    // Default admin fallback
    if (trimmed.includes('admin')) {
      const adminUser = learners.find((u) => u.role === 'admin') || INITIAL_USERS[5];
      setCurrentUser(adminUser);
      setAuthModalOpen(false);
      return true;
    }

    return false;
  };

  const register = (userData: Partial<UserAccount>) => {
    const newId = `usr-${Date.now()}`;
    const newUser: UserAccount = {
      id: newId,
      name: userData.name || 'New Learner',
      email: userData.email || `learner-${Date.now()}@farmforestry.or.ke`,
      role: 'learner',
      phone: userData.phone || '0700 000 000',
      county: userData.county || 'Nyandarua County',
      location: userData.location || 'Ol\'Kalou',
      farmSizeAcres: userData.farmSizeAcres || 2.0,
      occupation: userData.occupation || 'Smallholder Farmer',
      registeredDate: new Date().toISOString().split('T')[0],
      enrolledCourses: authModalCourseToEnroll ? [authModalCourseToEnroll] : ['course-cffb'],
      completedModules: [],
      quizScores: {},
      practicalSubmitted: false,
      actionPlanSubmitted: false,
    };

    setLearners((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);

    if (authModalCourseToEnroll) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === authModalCourseToEnroll ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
        )
      );
      setAuthModalCourseToEnroll(null);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isEnrolled = (courseId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.enrolledCourses.includes(courseId);
  };

  const completeEnrollment = (courseId: string, user: UserAccount) => {
    if (user.enrolledCourses.includes(courseId)) return;
    const updatedUser = {
      ...user,
      enrolledCourses: [...user.enrolledCourses, courseId],
    };
    setCurrentUser(updatedUser);
    setLearners((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c))
    );
  };

  const enrolInCourse = (courseId: string) => {
    if (!currentUser) {
      setAuthModalCourseToEnroll(courseId);
      setAuthModalOpen(true);
      return;
    }
    completeEnrollment(courseId, currentUser);
  };

  // Course Admin Methods
  const addCourse = (newCourse: CurriculumCourse) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updates: Partial<CurriculumCourse>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Map elements
  const addMapElement = (element: Omit<FarmMapPlan['elements'][0], 'id'>) => {
    const newEl = { ...element, id: `el-${Date.now()}` };
    setFarmMap((prev) => ({
      ...prev,
      elements: [...prev.elements, newEl]
    }));
  };

  const removeMapElement = (id: string) => {
    setFarmMap((prev) => ({
      ...prev,
      elements: prev.elements.filter((e) => e.id !== id)
    }));
  };

  const updateActionPlan = (data: Partial<ActionPlan>) => {
    setActionPlan((prev) => ({ ...prev, ...data }));
  };

  const updateActionPlanRow = (index: number, updates: Partial<ActionPlan['rows'][0]>) => {
    setActionPlan((prev) => {
      const nextRows = [...prev.rows];
      nextRows[index] = { ...nextRows[index], ...updates };
      return { ...prev, rows: nextRows };
    });
  };

  const toggleCompetency = (id: string, status: 'competent' | 'needs_practice') => {
    setCompetencies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const completeModuleQuiz = (moduleId: string, score: number) => {
    if (!currentUser) return;
    const quizScores = { ...currentUser.quizScores, [moduleId]: score };
    const completedModules = currentUser.completedModules.includes(moduleId)
      ? currentUser.completedModules
      : [...currentUser.completedModules, moduleId];

    const updatedUser = {
      ...currentUser,
      quizScores,
      completedModules,
    };
    setCurrentUser(updatedUser);
    setLearners((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  const isModuleCompleted = (moduleId: string) => {
    if (!currentUser) return false;
    return currentUser.completedModules.includes(moduleId);
  };

  // Assessment calculation (TVETA & TGAN 30-Hour Standard)
  const calculateFinalGrade = () => {
    const scores = currentUser?.quizScores || {};
    const quizCount = Object.keys(scores).length;
    const avgQuiz = quizCount > 0
      ? Object.values(scores).reduce((a, b) => a + b, 0) / Math.max(quizCount, 1)
      : 80;

    const competentSkills = competencies.filter((c) => c.status === 'competent').length;
    const practicalPercent = Math.min(100, Math.round((competentSkills / 11) * 100));

    const planPercent = actionPlan.rows.filter((r) => r.status === 'Completed' || r.status === 'In Progress').length >= 4 ? 90 : 70;
    const participationPercent = 88;

    const writtenContribution = (avgQuiz * 0.20);
    const practicalContribution = (practicalPercent * 0.40);
    const planContribution = (planPercent * 0.25);
    const participationContribution = (participationPercent * 0.15);

    const totalWeighted = Math.round(writtenContribution + practicalContribution + planContribution + participationContribution);

    let grade: 'Distinction' | 'Credit' | 'Pass' | 'Needs Practice' = 'Needs Practice';
    if (totalWeighted >= 80) grade = 'Distinction';
    else if (totalWeighted >= 65) grade = 'Credit';
    else if (totalWeighted >= 50) grade = 'Pass';

    return {
      writtenScore: Math.round(avgQuiz),
      practicalScore: practicalPercent,
      planScore: planPercent,
      participationScore: participationPercent,
      totalWeighted,
      grade
    };
  };

  const issueCertificate = () => {
    if (!currentUser) return;
    const result = calculateFinalGrade();
    const certNum = `FFTC-CFFB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().split('T')[0];

    const newCert: AwardedCertificate = {
      id: `cert-${Date.now()}`,
      certNumber: certNum,
      recipientId: currentUser.id,
      recipientName: currentUser.name,
      recipientEmail: currentUser.email,
      courseId: 'course-cffb',
      courseName: 'Certificate in Farm Forestry Basics (CFFB)',
      issueDate: now,
      score: result.totalWeighted,
      grade: result.grade === 'Needs Practice' ? 'Pass' : result.grade,
      issuer: 'Farm Forestry Training Center (FFTC) & TGAN Board',
      status: 'Verified',
    };

    setCertificatesRegistry((prev) => [newCert, ...prev]);

    const updatedUser: UserAccount = {
      ...currentUser,
      certificateEarned: {
        certNumber: certNum,
        courseId: 'course-cffb',
        courseName: 'Certificate in Farm Forestry Basics (CFFB)',
        issueDate: now,
        grade: result.grade === 'Needs Practice' ? 'Pass' : result.grade,
        score: result.totalWeighted,
      }
    };

    setCurrentUser(updatedUser);
    setLearners((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setActiveTab('certificate');
  };

  const updateLearner = (data: Partial<UserAccount>) => {
    if (currentUser) {
      const updated = { ...currentUser, ...data };
      setCurrentUser(updated);
      setLearners((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    }
  };

  const activeLearner: UserAccount = currentUser || learners[0] || INITIAL_USERS[0];

  return (
    <FFTCContext.Provider
      value={{
        currentUser,
        learner: activeLearner,
        updateLearner,
        isLoggedIn,
        isAdmin,
        login,
        register,
        logout,
        learners,
        courses,
        enrolInCourse,
        isEnrolled,
        addCourse,
        updateCourse,
        deleteCourse,
        activeTab,
        setActiveTab,
        selectedModuleId,
        setSelectedModuleId,
        selectedCourseId,
        setSelectedCourseId,
        authModalOpen,
        setAuthModalOpen,
        authModalCourseToEnroll,
        setAuthModalCourseToEnroll,
        certificatesRegistry,
        farmMap,
        setFarmMap,
        addMapElement,
        removeMapElement,
        actionPlan,
        updateActionPlan,
        updateActionPlanRow,
        competencies,
        toggleCompetency,
        completeModuleQuiz,
        isModuleCompleted,
        costingItems,
        setCostingItems,
        revenueItems,
        setRevenueItems,
        calculateFinalGrade,
        issueCertificate
      }}
    >
      {children}
    </FFTCContext.Provider>
  );
};

export const useFFTC = () => {
  const context = useContext(FFTCContext);
  if (!context) {
    throw new Error('useFFTC must be used within an FFTCProvider');
  }
  return context;
};
