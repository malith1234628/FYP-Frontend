import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Globe,
  TrendingUp,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  Copy,
  Settings,
  Type,
  AlignLeft,
  List,
  CheckSquare,
  ChevronDown,
  Calendar,
  Upload,
  Save,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";

const countries = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "New Zealand",
  "Netherlands",
  "Ireland",
  "Singapore"
];

const universities = {
  "United Kingdom": ["University of Oxford", "University of Cambridge", "Imperial College London", "UCL", "King's College London"],
  "United States": ["Harvard University", "MIT", "Stanford University", "Yale University", "Princeton University"],
  "Canada": ["University of Toronto", "McGill University", "UBC", "McMaster University", "University of Alberta"],
  "Australia": ["University of Melbourne", "ANU", "University of Sydney", "UNSW", "University of Queensland"],
  "Germany": ["TU Munich", "LMU Munich", "Heidelberg University", "Humboldt University", "RWTH Aachen"],
  "France": ["Sorbonne University", "École Polytechnique", "Sciences Po", "ENS Paris", "University of Paris"],
  "New Zealand": ["University of Auckland", "University of Otago", "Victoria University", "University of Canterbury", "Massey University"],
  "Netherlands": ["University of Amsterdam", "Utrecht University", "Leiden University", "TU Delft", "Erasmus University"],
  "Ireland": ["Trinity College Dublin", "UCD", "UCC", "NUI Galway", "DCU"],
  "Singapore": ["NUS", "NTU", "SMU", "SUTD", "SIM"]
};

type QuestionType = 'short-answer' | 'paragraph' | 'multiple-choice' | 'checkboxes' | 'dropdown' | 'date' | 'file-upload';

type FormQuestion = {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
};

type UniversityForm = {
  formTitle: string;
  formDescription: string;
  questions: FormQuestion[];
};

const questionTypes = [
  { type: 'short-answer' as QuestionType, label: 'Short Answer', icon: Type, description: 'Brief text response' },
  { type: 'paragraph' as QuestionType, label: 'Paragraph', icon: AlignLeft, description: 'Long text response' },
  { type: 'multiple-choice' as QuestionType, label: 'Multiple Choice', icon: List, description: 'Single selection' },
  { type: 'checkboxes' as QuestionType, label: 'Checkboxes', icon: CheckSquare, description: 'Multiple selections' },
  { type: 'dropdown' as QuestionType, label: 'Dropdown', icon: ChevronDown, description: 'Select from list' },
  { type: 'date' as QuestionType, label: 'Date', icon: Calendar, description: 'Date picker' },
  { type: 'file-upload' as QuestionType, label: 'File Upload', icon: Upload, description: 'Upload documents' },
];

export default function AgencyRegistrationPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 data
  const [agencyName, setAgencyName] = useState("");
  const [businessRegistration, setBusinessRegistration] = useState("");
  const [countryOfOperation, setCountryOfOperation] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [headOfficeAddress, setHeadOfficeAddress] = useState("");

  // Step 2 data
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<{[key: string]: string[]}>({});
  const [processingTimes, setProcessingTimes] = useState<{[key: string]: string}>({});
  const [serviceDescription, setServiceDescription] = useState("");

  // Step 3 data
  const [totalStudents, setTotalStudents] = useState("");
  const [totalVisasApproved, setTotalVisasApproved] = useState("");

  // Step 4 data - Form builder
  const [universityForms, setUniversityForms] = useState<{[key: string]: UniversityForm}>({});
  const [currentUniversity, setCurrentUniversity] = useState<string>("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const successRate = totalStudents && totalVisasApproved 
    ? ((parseInt(totalVisasApproved) / parseInt(totalStudents)) * 100).toFixed(1)
    : "0";

  const handleCountrySelect = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
      const newUniversities = {...selectedUniversities};
      delete newUniversities[country];
      setSelectedUniversities(newUniversities);
      const newProcessingTimes = {...processingTimes};
      delete newProcessingTimes[country];
      setProcessingTimes(newProcessingTimes);
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const handleUniversitySelect = (country: string, university: string) => {
    const currentUnis = selectedUniversities[country] || [];
    if (currentUnis.includes(university)) {
      setSelectedUniversities({
        ...selectedUniversities,
        [country]: currentUnis.filter(u => u !== university)
      });
    } else {
      setSelectedUniversities({
        ...selectedUniversities,
        [country]: [...currentUnis, university]
      });
    }
  };

  const getAllSelectedUniversities = (): string[] => {
    return Object.values(selectedUniversities).flat();
  };

  // Form builder functions
  const initializeFormForUniversity = (university: string) => {
    if (!universityForms[university]) {
      setUniversityForms({
        ...universityForms,
        [university]: {
          formTitle: `${university} - Application Form`,
          formDescription: "Please fill out this application form to apply through our agency.",
          questions: []
        }
      });
    }
  };

  const addQuestion = (type: QuestionType) => {
    if (!currentUniversity) return;
    
    const currentForm = universityForms[currentUniversity] || {
      formTitle: `${currentUniversity} - Application Form`,
      formDescription: "Please fill out this application form to apply through our agency.",
      questions: []
    };

    const newQuestion: FormQuestion = {
      id: `q-${Date.now()}`,
      type,
      title: 'Untitled Question',
      placeholder: '',
      required: false,
      options: type === 'multiple-choice' || type === 'checkboxes' || type === 'dropdown' 
        ? ['Option 1'] 
        : undefined
    };

    setUniversityForms({
      ...universityForms,
      [currentUniversity]: {
        ...currentForm,
        questions: [...currentForm.questions, newQuestion]
      }
    });
    
    setSelectedQuestionId(newQuestion.id);
  };

  const updateQuestion = (questionId: string, updates: Partial<FormQuestion>) => {
    if (!currentUniversity) return;
    
    const currentForm = universityForms[currentUniversity];
    if (!currentForm) return;

    setUniversityForms({
      ...universityForms,
      [currentUniversity]: {
        ...currentForm,
        questions: currentForm.questions.map(q => 
          q.id === questionId ? { ...q, ...updates } : q
        )
      }
    });
  };

  const deleteQuestion = (questionId: string) => {
    if (!currentUniversity) return;
    
    const currentForm = universityForms[currentUniversity];
    if (!currentForm) return;

    setUniversityForms({
      ...universityForms,
      [currentUniversity]: {
        ...currentForm,
        questions: currentForm.questions.filter(q => q.id !== questionId)
      }
    });
    
    if (selectedQuestionId === questionId) {
      setSelectedQuestionId(null);
    }
  };

  const duplicateQuestion = (questionId: string) => {
    if (!currentUniversity) return;
    
    const currentForm = universityForms[currentUniversity];
    if (!currentForm) return;

    const question = currentForm.questions.find(q => q.id === questionId);
    if (!question) return;

    const duplicatedQuestion: FormQuestion = {
      ...question,
      id: `q-${Date.now()}`,
      title: `${question.title} (Copy)`
    };

    const questionIndex = currentForm.questions.findIndex(q => q.id === questionId);
    const newQuestions = [...currentForm.questions];
    newQuestions.splice(questionIndex + 1, 0, duplicatedQuestion);

    setUniversityForms({
      ...universityForms,
      [currentUniversity]: {
        ...currentForm,
        questions: newQuestions
      }
    });
  };

  const addOption = (questionId: string) => {
    if (!currentUniversity) return;
    
    const currentForm = universityForms[currentUniversity];
    if (!currentForm) return;

    const question = currentForm.questions.find(q => q.id === questionId);
    if (!question || !question.options) return;

    updateQuestion(questionId, {
      options: [...question.options, `Option ${question.options.length + 1}`]
    });
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    if (!currentUniversity) return;
    
    const currentForm = universityForms[currentUniversity];
    if (!currentForm) return;

    const question = currentForm.questions.find(q => q.id === questionId);
    if (!question || !question.options) return;

    const newOptions = [...question.options];
    newOptions[optionIndex] = value;

    updateQuestion(questionId, { options: newOptions });
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    if (!currentUniversity) return;
    
    const currentForm = universityForms[currentUniversity];
    if (!currentForm) return;

    const question = currentForm.questions.find(q => q.id === questionId);
    if (!question || !question.options || question.options.length <= 1) return;

    const newOptions = question.options.filter((_, index) => index !== optionIndex);
    updateQuestion(questionId, { options: newOptions });
  };

  const updateFormMetadata = (updates: Partial<Pick<UniversityForm, 'formTitle' | 'formDescription'>>) => {
    if (!currentUniversity) return;
    
    const currentForm = universityForms[currentUniversity];
    if (!currentForm) return;

    setUniversityForms({
      ...universityForms,
      [currentUniversity]: {
        ...currentForm,
        ...updates
      }
    });
  };

  const canProceedStep1 = agencyName && businessRegistration && countryOfOperation && 
                          contactEmail && contactPhone && headOfficeAddress;

  const canProceedStep2 = selectedCountries.length > 0 && serviceDescription &&
                          selectedCountries.every(country => 
                            (selectedUniversities[country]?.length || 0) > 0 &&
                            processingTimes[country]
                          );

  const canProceedStep3 = totalStudents && totalVisasApproved;

  const canProceedStep4 = getAllSelectedUniversities().every(uni => {
    const form = universityForms[uni];
    return form && form.questions.length > 0;
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      
      // Initialize form for first university when entering step 4
      if (currentStep === 3) {
        const allUnis = getAllSelectedUniversities();
        if (allUnis.length > 0 && !currentUniversity) {
          setCurrentUniversity(allUnis[0]);
          initializeFormForUniversity(allUnis[0]);
        }
      }
      
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    alert("Agency registration submitted successfully! 🎉");
    navigate("/agency-dashboard");
  };

  const currentForm = currentUniversity ? universityForms[currentUniversity] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Visa Agency Marketplace</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Exit Registration
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register Your Visa Agency 🏢</h1>
          <p className="text-gray-600">Join our platform and help students achieve their dreams</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ 
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {currentStep > 1 ? <CheckCircle2 className="w-6 h-6" /> : '1'}
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-xs font-semibold ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  Step 1
                </p>
                <p className="text-xs text-gray-500">Basic Info</p>
              </div>
              <div className={`flex-1 h-1 mx-2 ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ 
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {currentStep > 2 ? <CheckCircle2 className="w-6 h-6" /> : '2'}
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-xs font-semibold ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  Step 2
                </p>
                <p className="text-xs text-gray-500">Services</p>
              </div>
              <div className={`flex-1 h-1 mx-2 ${currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ 
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {currentStep > 3 ? <CheckCircle2 className="w-6 h-6" /> : '3'}
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-xs font-semibold ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  Step 3
                </p>
                <p className="text-xs text-gray-500">Performance</p>
              </div>
              <div className={`flex-1 h-1 mx-2 ${currentStep > 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ 
                currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                4
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-xs font-semibold ${currentStep >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
                  Step 4
                </p>
                <p className="text-xs text-gray-500">Forms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep !== 4 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                {currentStep === 1 && "📋 Agency Basic Information"}
                {currentStep === 2 && "🌍 Services Configuration"}
                {currentStep === 3 && "📊 Performance Information"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="agencyName">Agency Name *</Label>
                    <Input
                      id="agencyName"
                      placeholder="e.g., Global Visa Solutions"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessRegistration">Business Registration / License Number *</Label>
                    <Input
                      id="businessRegistration"
                      placeholder="e.g., BR-123456789"
                      value={businessRegistration}
                      onChange={(e) => setBusinessRegistration(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="countryOfOperation">Country of Operation *</Label>
                    <select
                      id="countryOfOperation"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={countryOfOperation}
                      onChange={(e) => setCountryOfOperation(e.target.value)}
                    >
                      <option value="">Select country</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@agency.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+94 71 234 5678"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headOfficeAddress">Head Office Address *</Label>
                    <Textarea
                      id="headOfficeAddress"
                      placeholder="Enter complete address"
                      value={headOfficeAddress}
                      onChange={(e) => setHeadOfficeAddress(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Services Configuration */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Countries You Provide Visa Services For *</Label>
                    <p className="text-sm text-gray-600">Select all countries where you can assist with visa applications</p>
                    <div className="grid grid-cols-2 gap-3">
                      {countries.map(country => (
                        <div key={country} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                          <Checkbox
                            id={country}
                            checked={selectedCountries.includes(country)}
                            onCheckedChange={() => handleCountrySelect(country)}
                          />
                          <label
                            htmlFor={country}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {country}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedCountries.length > 0 && (
                    <div className="space-y-6 pt-4 border-t">
                      {selectedCountries.map(country => (
                        <div key={country} className="space-y-4 p-4 bg-blue-50 rounded-lg">
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-blue-600" />
                            {country}
                          </h3>
                          
                          <div className="space-y-2">
                            <Label>Universities Supported *</Label>
                            <div className="grid grid-cols-1 gap-2 bg-white p-3 rounded-lg max-h-48 overflow-y-auto">
                              {universities[country as keyof typeof universities]?.map(university => (
                                <div key={university} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`${country}-${university}`}
                                    checked={selectedUniversities[country]?.includes(university) || false}
                                    onCheckedChange={() => handleUniversitySelect(country, university)}
                                  />
                                  <label
                                    htmlFor={`${country}-${university}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  >
                                    {university}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`processing-${country}`}>Average Processing Time *</Label>
                            <Input
                              id={`processing-${country}`}
                              placeholder="e.g., 4-6 weeks"
                              value={processingTimes[country] || ""}
                              onChange={(e) => setProcessingTimes({...processingTimes, [country]: e.target.value})}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="serviceDescription">Service Description *</Label>
                    <Textarea
                      id="serviceDescription"
                      placeholder="Describe your agency's services, expertise, and what makes you unique..."
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Performance Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>📊 Why we need this:</strong> This information helps students make informed decisions and builds trust in your agency.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalStudents">Total Students Handled *</Label>
                    <Input
                      id="totalStudents"
                      type="number"
                      placeholder="e.g., 500"
                      value={totalStudents}
                      onChange={(e) => setTotalStudents(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalVisasApproved">Total Visas Approved *</Label>
                    <Input
                      id="totalVisasApproved"
                      type="number"
                      placeholder="e.g., 475"
                      value={totalVisasApproved}
                      onChange={(e) => setTotalVisasApproved(e.target.value)}
                    />
                  </div>

                  {totalStudents && totalVisasApproved && (
                    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        <h3 className="font-semibold text-gray-900">Approval Success Rate</h3>
                      </div>
                      <p className="text-4xl font-bold text-green-600">{successRate}%</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Auto-calculated based on your inputs
                      </p>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <h3 className="font-semibold mb-3">📋 Registration Summary</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Agency Name:</strong> {agencyName}</p>
                      <p><strong>Country of Operation:</strong> {countryOfOperation}</p>
                      <p><strong>Services for:</strong> {selectedCountries.join(", ")}</p>
                      <p><strong>Total Universities:</strong> {Object.values(selectedUniversities).flat().length}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2) ||
                    (currentStep === 3 && !canProceedStep3)
                  }
                  className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Google Forms-like Form Builder */}
        {currentStep === 4 && (
          <div className="space-y-4">
            {/* University Selector and Top Bar */}
            <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <Label className="text-sm font-semibold whitespace-nowrap">Building form for:</Label>
                <select
                  className="flex h-10 flex-1 max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={currentUniversity}
                  onChange={(e) => {
                    setCurrentUniversity(e.target.value);
                    initializeFormForUniversity(e.target.value);
                    setSelectedQuestionId(null);
                    setIsPreviewMode(false);
                  }}
                >
                  {getAllSelectedUniversities().map(uni => (
                    <option key={uni} value={uni}>
                      {uni} {universityForms[uni]?.questions.length > 0 ? `(${universityForms[uni].questions.length} questions)` : '(Empty)'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={isPreviewMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={isPreviewMode ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {isPreviewMode ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Exit Preview
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Preview Mode */}
            {isPreviewMode && currentForm && (
              <div className="bg-white rounded-lg shadow-lg border p-8 max-w-3xl mx-auto">
                <div className="mb-8 pb-6 border-b">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentForm.formTitle}</h1>
                  <p className="text-gray-600">{currentForm.formDescription}</p>
                  {currentForm.questions.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <span>Step 1 of {currentForm.questions.length}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-xs">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {currentForm.questions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">
                        {index + 1}. {question.title}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {question.description && (
                        <p className="text-sm text-gray-600">{question.description}</p>
                      )}
                      
                      {question.type === 'short-answer' && (
                        <Input placeholder={question.placeholder || "Your answer"} className="max-w-xl" />
                      )}
                      
                      {question.type === 'paragraph' && (
                        <Textarea placeholder={question.placeholder || "Your answer"} rows={4} className="max-w-xl" />
                      )}
                      
                      {question.type === 'multiple-choice' && (
                        <div className="space-y-2">
                          {question.options?.map((option, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <input type="radio" name={question.id} id={`${question.id}-${idx}`} className="w-4 h-4" />
                              <label htmlFor={`${question.id}-${idx}`} className="text-sm">{option}</label>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'checkboxes' && (
                        <div className="space-y-2">
                          {question.options?.map((option, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <Checkbox id={`${question.id}-${idx}`} />
                              <label htmlFor={`${question.id}-${idx}`} className="text-sm">{option}</label>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'dropdown' && (
                        <select className="flex h-10 w-full max-w-xl rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="">Choose an option</option>
                          {question.options?.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                          ))}
                        </select>
                      )}
                      
                      {question.type === 'date' && (
                        <Input type="date" className="max-w-xl" />
                      )}
                      
                      {question.type === 'file-upload' && (
                        <div className="border-2 border-dashed rounded-lg p-8 text-center max-w-xl">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {currentForm.questions.length > 0 && (
                  <div className="mt-8 pt-6 border-t flex justify-between">
                    <Button variant="outline">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Form Builder Interface */}
            {!isPreviewMode && currentForm && (
              <div className="flex gap-4">
                {/* Left Sidebar - Question Types */}
                <div className="w-64 shrink-0">
                  <Card className="border-0 shadow-lg sticky top-24">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold">Question Types</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      {questionTypes.map(({ type, label, icon: Icon, description }) => (
                        <button
                          key={type}
                          onClick={() => addQuestion(type)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left group"
                        >
                          <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{label}</p>
                            <p className="text-xs text-gray-500 truncate">{description}</p>
                          </div>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Main Canvas */}
                <div className="flex-1 space-y-4">
                  {/* Form Header */}
                  <Card className="border-0 shadow-lg border-t-4 border-t-blue-600">
                    <CardContent className="p-6 space-y-4">
                      <Input
                        value={currentForm.formTitle}
                        onChange={(e) => updateFormMetadata({ formTitle: e.target.value })}
                        className="text-2xl font-bold border-0 border-b rounded-none px-0 focus-visible:ring-0"
                        placeholder="Form Title"
                      />
                      <Textarea
                        value={currentForm.formDescription}
                        onChange={(e) => updateFormMetadata({ formDescription: e.target.value })}
                        className="border-0 border-b rounded-none px-0 resize-none focus-visible:ring-0"
                        placeholder="Form description"
                        rows={2}
                      />
                    </CardContent>
                  </Card>

                  {/* Questions */}
                  {currentForm.questions.length === 0 ? (
                    <Card className="border-2 border-dashed border-gray-300">
                      <CardContent className="p-12 text-center">
                        <Plus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="font-semibold text-gray-900 mb-2">No questions yet</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Click on a question type from the left sidebar to add your first question
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    currentForm.questions.map((question, index) => (
                      <Card
                        key={question.id}
                        className={`border-0 shadow-lg transition-all ${
                          selectedQuestionId === question.id ? 'ring-2 ring-blue-600' : ''
                        }`}
                        onClick={() => setSelectedQuestionId(question.id)}
                      >
                        <CardContent className="p-6 space-y-4">
                          {/* Question Header */}
                          <div className="flex items-start gap-3">
                            <GripVertical className="w-5 h-5 text-gray-400 mt-2 cursor-move" />
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-500">Question {index + 1}</span>
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                  {questionTypes.find(qt => qt.type === question.type)?.label}
                                </span>
                              </div>
                              
                              <Input
                                value={question.title}
                                onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                                placeholder="Question title"
                                className="text-base font-medium"
                              />
                              
                              {/* Options for multiple choice, checkboxes, dropdown */}
                              {(question.type === 'multiple-choice' || question.type === 'checkboxes' || question.type === 'dropdown') && (
                                <div className="space-y-2 ml-4">
                                  {question.options?.map((option, optIdx) => (
                                    <div key={optIdx} className="flex items-center gap-2">
                                      {question.type === 'multiple-choice' && (
                                        <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                                      )}
                                      {question.type === 'checkboxes' && (
                                        <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                                      )}
                                      {question.type === 'dropdown' && (
                                        <span className="text-gray-400">{optIdx + 1}.</span>
                                      )}
                                      <Input
                                        value={option}
                                        onChange={(e) => updateOption(question.id, optIdx, e.target.value)}
                                        placeholder={`Option ${optIdx + 1}`}
                                        className="flex-1 h-9"
                                      />
                                      {question.options && question.options.length > 1 && (
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => deleteOption(question.id, optIdx)}
                                        >
                                          <X className="w-4 h-4" />
                                        </Button>
                                      )}
                                    </div>
                                  ))}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => addOption(question.id)}
                                    className="text-blue-600"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add option
                                  </Button>
                                </div>
                              )}
                              
                              {/* Placeholder for text inputs */}
                              {(question.type === 'short-answer' || question.type === 'paragraph') && (
                                <Input
                                  value={question.placeholder || ''}
                                  onChange={(e) => updateQuestion(question.id, { placeholder: e.target.value })}
                                  placeholder="Placeholder text (optional)"
                                  className="h-9"
                                />
                              )}
                              
                              {/* Description */}
                              <Input
                                value={question.description || ''}
                                onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                                placeholder="Help text (optional)"
                                className="h-9 text-sm"
                              />
                            </div>
                          </div>

                          {/* Question Actions */}
                          <div className="flex items-center justify-between pt-3 border-t">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`required-${question.id}`}
                                checked={question.required}
                                onCheckedChange={(checked) => updateQuestion(question.id, { required: !!checked })}
                              />
                              <label
                                htmlFor={`required-${question.id}`}
                                className="text-sm font-medium cursor-pointer"
                              >
                                Required
                              </label>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => duplicateQuestion(question.id)}
                                title="Duplicate"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteQuestion(question.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Forms Summary */}
            {!isPreviewMode && (
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    Forms Progress
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getAllSelectedUniversities().map(uni => (
                      <div
                        key={uni}
                        className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                          currentUniversity === uni 
                            ? 'bg-white border-blue-600' 
                            : 'bg-white/50 border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => {
                          setCurrentUniversity(uni);
                          initializeFormForUniversity(uni);
                          setIsPreviewMode(false);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900 truncate">{uni}</span>
                          <span className={`text-xs font-semibold ${
                            (universityForms[uni]?.questions.length || 0) > 0 ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {(universityForms[uni]?.questions.length || 0) > 0 
                              ? `✓ ${universityForms[uni].questions.length} questions` 
                              : '⚠ Empty'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              <Button
                onClick={handleSubmit}
                disabled={!canProceedStep4}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                Complete Registration 🎉
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
