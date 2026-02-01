import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/app/pages/LandingPage";
import RoleSelectionPage from "@/app/pages/RoleSelectionPage";
import LoginTypeSelectionPage from "@/app/pages/LoginTypeSelectionPage";
import LoginPage from "@/app/pages/LoginPage";
import AgentLoginPage from "@/app/pages/AgentLoginPage";
import RegisterPage from "@/app/pages/RegisterPage";
import OnboardingPage from "@/app/pages/OnboardingPage";
import DashboardPage from "@/app/pages/DashboardPage";
import ApplyVisaPage from "@/app/pages/ApplyVisaPage";
import UniversityRecommendationsPage from "@/app/pages/UniversityRecommendationsPage";
import VisaAgencyRecommendationsPage from "@/app/pages/VisaAgencyRecommendationsPage";
import ApplicationFormPage from "@/app/pages/ApplicationFormPage";
import DocumentUploadPage from "@/app/pages/DocumentUploadPage";
import DocumentVerificationPage from "@/app/pages/DocumentVerificationPage";
import ApprovalPredictionPage from "@/app/pages/ApprovalPredictionPage";
import SubmitApplicationPage from "@/app/pages/SubmitApplicationPage";
import PaymentPage from "@/app/pages/PaymentPage";
import ChatPage from "@/app/pages/ChatPage";
import SettingsPage from "@/app/pages/SettingsPage";

// Agency Workflow Pages
import AgencyRegistrationPage from "@/app/pages/AgencyRegistrationPage";
import AgencyDashboardPage from "@/app/pages/AgencyDashboardPage";
import AgencyRequestManagementPage from "@/app/pages/AgencyRequestManagementPage";
import AgencyFormBuilderPage from "@/app/pages/AgencyFormBuilderPage";
import AgencyAgentManagementPage from "@/app/pages/AgencyAgentManagementPage";
import AgencyCaseAssignmentPage from "@/app/pages/AgencyCaseAssignmentPage";
import AgentApplicationProcessingPage from "@/app/pages/AgentApplicationProcessingPage";
import AgencyAnalyticsPage from "@/app/pages/AgencyAnalyticsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/role-selection" element={<RoleSelectionPage />} />
        <Route path="/login-type-selection" element={<LoginTypeSelectionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/agent-login" element={<AgentLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/apply-visa" element={<ApplyVisaPage />} />
        <Route path="/university-recommendations" element={<UniversityRecommendationsPage />} />
        <Route path="/visa-agency-recommendations" element={<VisaAgencyRecommendationsPage />} />
        <Route path="/application-form" element={<ApplicationFormPage />} />
        <Route path="/document-upload" element={<DocumentUploadPage />} />
        <Route path="/document-verification" element={<DocumentVerificationPage />} />
        <Route path="/approval-prediction" element={<ApprovalPredictionPage />} />
        <Route path="/submit-application" element={<SubmitApplicationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Agency Routes */}
        <Route path="/agency-registration" element={<AgencyRegistrationPage />} />
        <Route path="/agency-dashboard" element={<AgencyDashboardPage />} />
        <Route path="/agency-requests" element={<AgencyRequestManagementPage />} />
        <Route path="/agency-form-builder" element={<AgencyFormBuilderPage />} />
        <Route path="/agency-agents" element={<AgencyAgentManagementPage />} />
        <Route path="/agency-case-assignment" element={<AgencyCaseAssignmentPage />} />
        <Route path="/agency-applications" element={<AgentApplicationProcessingPage />} />
        <Route path="/agency-analytics" element={<AgencyAnalyticsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}