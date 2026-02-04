// Application Progress Tracking Utility

export type ApplicationStep = 
  | 'apply-visa'           // Step 1: Basic visa information
  | 'university-recommendations'  // Step 2: University selection
  | 'visa-agency-recommendations' // Step 3: Agency selection
  | 'application-form'     // Step 4: Fill agency form
  | 'document-upload'      // Step 5: Upload documents
  | 'payment'              // Step 6: Payment
  | 'completed';           // Application completed

export interface ApplicationProgress {
  currentStep: ApplicationStep;
  completedSteps: ApplicationStep[];
  lastUpdated: string;
  applicationData: any;
}

const PROGRESS_KEY = 'application_progress';

/**
 * Save the current application progress
 */
export function saveApplicationProgress(step: ApplicationStep, data?: any): void {
  const progress: ApplicationProgress = getApplicationProgress() || {
    currentStep: 'apply-visa',
    completedSteps: [],
    lastUpdated: new Date().toISOString(),
    applicationData: {}
  };

  // Update current step
  progress.currentStep = step;
  progress.lastUpdated = new Date().toISOString();

  // Add to completed steps if not already there
  if (!progress.completedSteps.includes(step)) {
    progress.completedSteps.push(step);
  }

  // Merge application data
  if (data) {
    progress.applicationData = {
      ...progress.applicationData,
      ...data
    };
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  console.log('💾 Progress saved:', step);
}

/**
 * Get the current application progress
 */
export function getApplicationProgress(): ApplicationProgress | null {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading application progress:', error);
    return null;
  }
}

/**
 * Clear application progress (after completion or cancellation)
 */
export function clearApplicationProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
  console.log('🗑️ Progress cleared');
}

/**
 * Check if there's an active application in progress
 */
export function hasActiveApplication(): boolean {
  const progress = getApplicationProgress();
  return progress !== null && progress.currentStep !== 'completed';
}

/**
 * Get the route path for the current step
 */
export function getCurrentStepRoute(): string {
  const progress = getApplicationProgress();
  if (!progress) return '/apply-visa';
  
  return `/${progress.currentStep}`;
}

/**
 * Get user-friendly step name
 */
export function getStepName(step: ApplicationStep): string {
  const stepNames: Record<ApplicationStep, string> = {
    'apply-visa': 'Basic Information',
    'university-recommendations': 'University Selection',
    'visa-agency-recommendations': 'Agency Selection',
    'application-form': 'Application Form',
    'document-upload': 'Document Upload',
    'payment': 'Payment',
    'completed': 'Completed'
  };
  
  return stepNames[step] || step;
}

/**
 * Get progress percentage
 */
export function getProgressPercentage(): number {
  const progress = getApplicationProgress();
  if (!progress) return 0;
  
  const allSteps: ApplicationStep[] = [
    'apply-visa',
    'university-recommendations',
    'visa-agency-recommendations',
    'application-form',
    'document-upload',
    'payment'
  ];
  
  const completedCount = progress.completedSteps.filter(step => 
    allSteps.includes(step)
  ).length;
  
  return Math.round((completedCount / allSteps.length) * 100);
}
