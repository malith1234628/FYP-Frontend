import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import LoginTypeSelectionPage from "./pages/LoginTypeSelectionPage";
import LoginPage from "./pages/LoginPage";
import AgentLoginPage from "./pages/AgentLoginPage";
import RegisterPage from "./pages/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import ApplyVisaPage from "./pages/ApplyVisaPage";
import UniversityRecommendationsPage from "./pages/UniversityRecommendationsPage";
import VisaAgencyRecommendationsPage from "./pages/VisaAgencyRecommendationsPage";
import ApplicationFormPage from "./pages/ApplicationFormPage";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import DocumentVerificationPage from "./pages/DocumentVerificationPage";
import ApprovalPredictionPage from "./pages/ApprovalPredictionPage";
import SubmitApplicationPage from "./pages/SubmitApplicationPage";
import PaymentPage from "./pages/PaymentPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";

// Agency Workflow Pages
import AgencyRegistrationPage from "./pages/AgencyRegistrationPage";
import AgencyDashboardPage from "./pages/AgencyDashboardPage";
import AgencyRequestManagementPage from "./pages/AgencyRequestManagementPage";
import AgencyFormBuilderPage from "./pages/AgencyFormBuilderPage";
import AgencyAgentManagementPage from "./pages/AgencyAgentManagementPage";
import AgencyCaseAssignmentPage from "./pages/AgencyCaseAssignmentPage";
import AgentApplicationProcessingPage from "./pages/AgentApplicationProcessingPage";
import AgencyAnalyticsPage from "./pages/AgencyAnalyticsPage";

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