import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Plus, Trash2, Upload, Check } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

export default function ApplyVisaPage() {
  const navigate = useNavigate();
  
  // Student Details State
  const [formData, setFormData] = useState({
    country: "",
    program: "",
    courseLevel: "",
    duration: "",
    courseFee: "",
    livingCost: "",
  });

  // O/L State
  const [olExamYear, setOlExamYear] = useState("");
  const [olSchool, setOlSchool] = useState("");
  const [olIndexNumber, setOlIndexNumber] = useState("");
  const [olStatus, setOlStatus] = useState("");
  const [olSubjects, setOlSubjects] = useState([{ subject: "", grade: "" }]);

  // A/L State
  const [alStream, setAlStream] = useState("");
  const [alExamYear, setAlExamYear] = useState("");
  const [alZScore, setAlZScore] = useState("");
  const [alDistrictRank, setAlDistrictRank] = useState("");
  const [alSubject1, setAlSubject1] = useState({ name: "", grade: "" });
  const [alSubject2, setAlSubject2] = useState({ name: "", grade: "" });
  const [alSubject3, setAlSubject3] = useState({ name: "", grade: "" });
  const [alEnglish, setAlEnglish] = useState("");
  const [alGeneralTest, setAlGeneralTest] = useState("");

  // Other Qualifications State
  const [qualifications, setQualifications] = useState([{
    type: "",
    institution: "",
    field: "",
    duration: "",
    status: "",
    result: "",
    certificateUploaded: false
  }]);

  // Additional Information State
  const [mediumOfStudy, setMediumOfStudy] = useState("");
  const [englishExamType, setEnglishExamType] = useState("");
  const [englishScore, setEnglishScore] = useState("");
  const [englishYear, setEnglishYear] = useState("");
  const [hasAcademicGap, setHasAcademicGap] = useState("");
  const [gapReason, setGapReason] = useState("");

  const addOlSubject = () => {
    setOlSubjects([...olSubjects, { subject: "", grade: "" }]);
  };

  const removeOlSubject = (index: number) => {
    setOlSubjects(olSubjects.filter((_, i) => i !== index));
  };

  const updateOlSubject = (index: number, field: string, value: string) => {
    const updated = [...olSubjects];
    updated[index] = { ...updated[index], [field]: value };
    setOlSubjects(updated);
  };

  const addQualification = () => {
    setQualifications([...qualifications, {
      type: "",
      institution: "",
      field: "",
      duration: "",
      status: "",
      result: "",
      certificateUploaded: false
    }]);
  };

  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const updateQualification = (index: number, field: string, value: string | boolean) => {
    const updated = [...qualifications];
    updated[index] = { ...updated[index], [field]: value };
    setQualifications(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/university-recommendations");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Visa Application</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Details 🎓</h1>
          <p className="text-gray-600">Tell us about your qualifications and study plans</p>
          <div className="mt-4">
            <Progress value={20} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 1 of 5</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EDUCATION QUALIFICATIONS SECTION */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
              <CardTitle className="text-2xl">Education Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* SECTION 1: O/L Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2 pb-2 border-b">
                  📘 SECTION 1: G.C.E. Ordinary Level (O/L) Results
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Exam Year</Label>
                    <Select value={olExamYear} onValueChange={setOlExamYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => 2024 - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>School Name</Label>
                    <Input 
                      value={olSchool} 
                      onChange={(e) => setOlSchool(e.target.value)}
                      placeholder="Enter school name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Index Number (Optional)</Label>
                  <Input 
                    value={olIndexNumber} 
                    onChange={(e) => setOlIndexNumber(e.target.value)}
                    placeholder="Enter index number"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Subject Results</Label>
                  {olSubjects.map((subject, index) => (
                    <div key={index} className="flex gap-2">
                      <Select value={subject.subject} onValueChange={(value) => updateOlSubject(index, "subject", value)}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sinhala">Sinhala</SelectItem>
                          <SelectItem value="Tamil">Tamil</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Geography">Geography</SelectItem>
                          <SelectItem value="Buddhism">Buddhism</SelectItem>
                          <SelectItem value="Hinduism">Hinduism</SelectItem>
                          <SelectItem value="Christianity">Christianity</SelectItem>
                          <SelectItem value="Islam">Islam</SelectItem>
                          <SelectItem value="Business & Accounting">Business & Accounting</SelectItem>
                          <SelectItem value="ICT">ICT</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={subject.grade} onValueChange={(value) => updateOlSubject(index, "grade", value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                        </SelectContent>
                      </Select>
                      {index > 0 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => removeOlSubject(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addOlSubject}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Subject
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Overall Status</Label>
                  <RadioGroup value={olStatus} onValueChange={setOlStatus}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="passed" id="ol-passed" />
                        <Label htmlFor="ol-passed">Passed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="failed" id="ol-failed" />
                        <Label htmlFor="ol-failed">Failed</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* SECTION 2: A/L Results */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-xl font-bold text-green-900 flex items-center gap-2 pb-2 border-b">
                  📗 SECTION 2: G.C.E. Advanced Level (A/L) Results
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Stream</Label>
                    <Select value={alStream} onValueChange={setAlStream}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Commerce">Commerce</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Exam Year</Label>
                    <Select value={alExamYear} onValueChange={setAlExamYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => 2024 - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Z-Score</Label>
                    <Input 
                      type="number"
                      step="0.0001"
                      value={alZScore} 
                      onChange={(e) => setAlZScore(e.target.value)}
                      placeholder="e.g., 1.8765"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>District Rank (Optional)</Label>
                    <Input 
                      type="number"
                      value={alDistrictRank} 
                      onChange={(e) => setAlDistrictRank(e.target.value)}
                      placeholder="Enter rank"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Subject Results</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex gap-2">
                      <Input 
                        className="flex-1"
                        value={alSubject1.name}
                        onChange={(e) => setAlSubject1({ ...alSubject1, name: e.target.value })}
                        placeholder="Subject 1"
                      />
                      <Select value={alSubject1.grade} onValueChange={(value) => setAlSubject1({ ...alSubject1, grade: value })}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Input 
                        className="flex-1"
                        value={alSubject2.name}
                        onChange={(e) => setAlSubject2({ ...alSubject2, name: e.target.value })}
                        placeholder="Subject 2"
                      />
                      <Select value={alSubject2.grade} onValueChange={(value) => setAlSubject2({ ...alSubject2, grade: value })}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Input 
                        className="flex-1"
                        value={alSubject3.name}
                        onChange={(e) => setAlSubject3({ ...alSubject3, name: e.target.value })}
                        placeholder="Subject 3"
                      />
                      <Select value={alSubject3.grade} onValueChange={(value) => setAlSubject3({ ...alSubject3, grade: value })}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>English Result (Optional)</Label>
                    <Select value={alEnglish} onValueChange={setAlEnglish}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>General Test Result (Optional)</Label>
                    <Select value={alGeneralTest} onValueChange={setAlGeneralTest}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Other Qualifications */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-xl font-bold text-orange-900 flex items-center gap-2 pb-2 border-b">
                  📙 SECTION 3: Other Qualifications
                </h3>
                
                {qualifications.map((qual, index) => (
                  <Card key={index} className="bg-gray-50 border">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-700">Qualification {index + 1}</h4>
                        {index > 0 && (
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeQualification(index)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Qualification Type</Label>
                          <Select 
                            value={qual.type} 
                            onValueChange={(value) => updateQualification(index, "type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Foundation">Foundation</SelectItem>
                              <SelectItem value="Diploma">Diploma</SelectItem>
                              <SelectItem value="Higher Diploma">Higher Diploma</SelectItem>
                              <SelectItem value="Certificate">Certificate</SelectItem>
                              <SelectItem value="NVQ Level">NVQ Level</SelectItem>
                              <SelectItem value="Professional Qualification">Professional Qualification</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Institution Name</Label>
                          <Input 
                            value={qual.institution}
                            onChange={(e) => updateQualification(index, "institution", e.target.value)}
                            placeholder="Enter institution name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Field of Study</Label>
                          <Input 
                            value={qual.field}
                            onChange={(e) => updateQualification(index, "field", e.target.value)}
                            placeholder="Enter field"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input 
                            value={qual.duration}
                            onChange={(e) => updateQualification(index, "duration", e.target.value)}
                            placeholder="e.g., 2 years"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Completion Status</Label>
                          <Select 
                            value={qual.status} 
                            onValueChange={(value) => updateQualification(index, "status", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="Ongoing">Ongoing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Result / GPA (Optional)</Label>
                          <Input 
                            value={qual.result}
                            onChange={(e) => updateQualification(index, "result", e.target.value)}
                            placeholder="e.g., 3.5 / 4.0"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Upload Certificate</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                          <input
                            type="file"
                            id={`qual-cert-${index}`}
                            className="hidden"
                            onChange={() => updateQualification(index, "certificateUploaded", true)}
                          />
                          <label htmlFor={`qual-cert-${index}`} className="cursor-pointer">
                            {qual.certificateUploaded ? (
                              <div className="flex items-center justify-center gap-2 text-green-600">
                                <Check className="w-4 h-4" />
                                <span className="text-sm">Uploaded successfully</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <Upload className="w-4 h-4 text-gray-400" />
                                <p className="text-sm text-gray-600">Click to upload</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button type="button" variant="outline" onClick={addQualification}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Qualification
                </Button>
              </div>

              {/* SECTION 4: Additional Academic Information */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-xl font-bold text-purple-900 flex items-center gap-2 pb-2 border-b">
                  🌍 SECTION 4: Additional Academic Information
                </h3>
                
                <div className="space-y-2">
                  <Label className="font-semibold">Medium of Study</Label>
                  <RadioGroup value={mediumOfStudy} onValueChange={setMediumOfStudy}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="English" id="medium-english" />
                        <Label htmlFor="medium-english">English</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sinhala" id="medium-sinhala" />
                        <Label htmlFor="medium-sinhala">Sinhala</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Tamil" id="medium-tamil" />
                        <Label htmlFor="medium-tamil">Tamil</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">English Proficiency Exam</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={englishExamType} onValueChange={setEnglishExamType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Exam type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IELTS">IELTS</SelectItem>
                        <SelectItem value="TOEFL">TOEFL</SelectItem>
                        <SelectItem value="PTE">PTE</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input 
                      value={englishScore}
                      onChange={(e) => setEnglishScore(e.target.value)}
                      placeholder="Score"
                    />

                    <Select value={englishYear} onValueChange={setEnglishYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Academic Gap Years</Label>
                  <RadioGroup value={hasAcademicGap} onValueChange={setHasAcademicGap}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="gap-no" />
                        <Label htmlFor="gap-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="gap-yes" />
                        <Label htmlFor="gap-yes">Yes</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {hasAcademicGap === "Yes" && (
                  <div className="space-y-2">
                    <Label>Reason for Academic Gap</Label>
                    <Input 
                      value={gapReason}
                      onChange={(e) => setGapReason(e.target.value)}
                      placeholder="Please explain the reason for your academic gap"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ACADEMIC INFORMATION SECTION */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="country">Destination Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData({ ...formData, country: value })
                  }
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program / Field of Study</Label>
                <Input
                  id="program"
                  placeholder="e.g., Computer Science"
                  value={formData.program}
                  onChange={(e) =>
                    setFormData({ ...formData, program: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseLevel">Course Level</Label>
                <Select
                  value={formData.courseLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, courseLevel: value })
                  }
                >
                  <SelectTrigger id="courseLevel">
                    <SelectValue placeholder="Select course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (Years)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  required
                  min="1"
                  max="10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseFee">Course Fee (USD)</Label>
                  <Input
                    id="courseFee"
                    type="number"
                    placeholder="e.g., 25000"
                    value={formData.courseFee}
                    onChange={(e) =>
                      setFormData({ ...formData, courseFee: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="livingCost">Living Cost (USD/year)</Label>
                  <Input
                    id="livingCost"
                    type="number"
                    placeholder="e.g., 15000"
                    value={formData.livingCost}
                    onChange={(e) =>
                      setFormData({ ...formData, livingCost: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Continue to University Recommendations
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
