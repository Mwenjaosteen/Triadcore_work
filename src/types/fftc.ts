export interface ModuleUnit {
  id: string;
  unitNumber: string;
  title: string;
  summary: string;
  keyPoints: string[];
  fieldTip?: string;
}

export interface TrainingModule {
  id: string;
  moduleNumber: number;
  title: string;
  hours: number;
  overview: string;
  learningObjectives: string[];
  keyConcepts: string[];
  analogyTitle?: string;
  analogyDescription?: string;
  units: ModuleUnit[];
  practicalActivityTitle: string;
  practicalActivityInstructions: string[];
  expectedCompetency: string;
  takeHomeMessages: string[];
  icon: string;
  color: string;
}

export interface CurriculumCourse {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: 'Agroforestry Foundations' | 'Nursery Management' | 'Timber & Silviculture' | 'Forestry Business & Carbon' | 'Soil & Water Conservation';
  durationWeeks: number;
  creditHours: number;
  instructor: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  description: string;
  targetAudience: string;
  enrolledCount: number;
  bannerImage: string;
  modules: TrainingModule[];
  prerequisites?: string[];
  featured?: boolean;
}

export interface FarmMapElement {
  id: string;
  type: 'house' | 'crops' | 'water' | 'boundary_trees' | 'intercropped_trees' | 'woodlot' | 'nursery' | 'erosion_zone';
  label: string;
  x: number; // grid position percentage 0-100
  y: number;
  notes?: string;
}

export interface FarmMapPlan {
  farmName: string;
  farmerName: string;
  location: string;
  farmSizeAcres: number;
  elements: FarmMapElement[];
  notes: string;
}

export interface ActionPlanRow {
  period: string; // e.g. "Jan - Feb"
  activity: string;
  materialsTools: string;
  responsiblePerson: string;
  status: 'Planned' | 'In Progress' | 'Completed';
}

export interface ActionPlan {
  farmerName: string;
  farmLocation: string;
  farmSize: string;
  mainFarmActivities: string;
  rows: ActionPlanRow[];
  treeProductionGoal: string;
  soilEnvironmentalGoal: string;
  incomeBusinessGoal: string;
  mainChallenge: string;
}

export interface CompetencyItem {
  id: string;
  skill: string;
  module: number;
  status: 'competent' | 'needs_practice' | 'unassessed';
  notes?: string;
}

export interface CostingItem {
  category: 'Establishment' | 'Maintenance' | 'Harvesting' | 'Processing';
  item: string;
  quantity: number;
  unitCostKES: number;
  totalCostKES: number;
}

export interface RevenueItem {
  product: 'Timber' | 'Poles & Posts' | 'Fuelwood' | 'Fruits' | 'Honey' | 'Seedlings' | 'Biochar';
  volume: string;
  unitPriceKES: number;
  totalRevenueKES: number;
}

export type UserRole = 'admin' | 'learner' | 'guest';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  county: string;
  location: string;
  farmSizeAcres: number;
  occupation: string;
  registeredDate: string;
  enrolledCourses: string[]; // Course IDs
  completedModules: string[];
  quizScores: Record<string, number>;
  practicalSubmitted: boolean;
  actionPlanSubmitted: boolean;
  certificateEarned?: {
    certNumber: string;
    courseId: string;
    courseName: string;
    issueDate: string;
    grade: 'Distinction' | 'Credit' | 'Pass';
    score: number;
  };
}

export type LearnerProfile = UserAccount;

export interface AwardedCertificate {
  id: string;
  certNumber: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  score: number;
  grade: 'Distinction' | 'Credit' | 'Pass';
  issuer: string;
  status: 'Active' | 'Verified';
}

export interface GlossaryTerm {
  term: string;
  simpleMeaning: string;
  localContext?: string;
}
