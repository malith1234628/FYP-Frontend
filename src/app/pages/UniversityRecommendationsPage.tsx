import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { saveApplicationProgress } from "@/app/utils/applicationProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, MapPin, AlertCircle, Award, Loader2, TrendingUp } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

interface SavedApplication {
  id: string;
  destination_country: string;
  city: string;
  program: string;
  course_level: string;
  duration_years: number;
  course_fee_usd: number;
  living_cost_usd: number;
  rent_usd: number;
  visa_fee_usd: number;
  insurance_usd: number;
}

const countryDisplayMap: Record<string, string> = {
  usa: "United States",
  uk: "United Kingdom",
  canada: "Canada",
  australia: "Australia",
  germany: "Germany",
};

const levelDisplayMap: Record<string, string> = {
  bachelor: "Bachelor",
  master: "Master",
  phd: "PhD",
  diploma: "Diploma",
};

export default function UniversityRecommendationsPage() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<SavedApplication | null>(null);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [rankings, setRankings] = useState<Record<string, string | null>>({});

  // Save progress when entering this page
  useEffect(() => {
    saveApplicationProgress('university-recommendations');
  }, []);

  // Fetch predicted rank for every recommended university in parallel
  useEffect(() => {
    if (universities.length === 0) return;

    const fetchRanks = async () => {
      const results = await Promise.all(
        universities.map(async (name) => {
          try {
            const res = await fetch("http://localhost:5003/api/predict-rank", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ Name: name }),
            });
            const data = await res.json();
            const rank: string | null = data.prediction ?? null;
            return { name, rank };
          } catch {
            return { name, rank: null };
          }
        })
      );

      const rankMap: Record<string, string | null> = {};
      results.forEach(({ name, rank }) => {
        rankMap[name] = rank;
      });
      setRankings(rankMap);
    };

    fetchRanks();
  }, [universities]);

  useEffect(() => {
    const stored = localStorage.getItem("visa_application");
    if (!stored) {
      setError("No application data found. Please go back and complete Step 1.");
      setLoading(false);
      return;
    }

    let app: SavedApplication;
    try {
      app = JSON.parse(stored);
    } catch {
      setError("Invalid application data. Please go back and re-submit.");
      setLoading(false);
      return;
    }
    setApplication(app);

    // Map saved application fields → ML model payload
    const payload = {
      Country: countryDisplayMap[app.destination_country] || app.destination_country,
      City: app.city,
      Program: app.program,
      Level: levelDisplayMap[app.course_level] || app.course_level,
      Duration_Years: Number(app.duration_years),
      Tuition_USD: Number(app.course_fee_usd),
      Living_Cost_Index: Number(app.living_cost_usd),
      Rent_USD: Number(app.rent_usd),
      Visa_Fee_USD: Number(app.visa_fee_usd),
      Insurance_USD: Number(app.insurance_usd),
    };

    fetch("http://localhost:5003/api/predict-university", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) =>
        res.json().then((body) => {
          if (!res.ok) {
            throw new Error(
              body.error ||
                body.message ||
                body.details ||
                `ML service returned ${res.status}`
            );
          }
          return body;
        })
      )
      .then((data) => {
        const top5: Array<{ university: string }> = Array.isArray(data.top_5)
          ? data.top_5
          : [];

        const names = top5
          .map((item) => item.university)
          .filter((name) => name && name !== "Other")
          .slice(0, 5);

        setUniversities(names);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(`Failed to get recommendations: ${err.message}`);
        setLoading(false);
      });
  }, []);

  const handleSelect = async (universityName: string, index: number) => {
    if (!application) return;
    setSavingIndex(index);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5003/api/students/applications/selected-university",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            application_id: application.id,
            university_name: universityName,
          }),
        }
      );

      if (!response.ok) {
        const body = await response.json();
        setError(body.message || "Failed to save selection.");
        setSavingIndex(null);
        return;
      }

      // Persist selected university so the next page can read it
      const updated = { ...application, selected_university: universityName };
      localStorage.setItem("visa_application", JSON.stringify(updated));
      saveApplicationProgress('visa-agency-recommendations', { selected_university: universityName });

      navigate("/visa-agency-recommendations");
    } catch {
      setError("Network error. Please try again.");
      setSavingIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/apply-visa")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Visa Application</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">University Recommendations 🎓</h1>
          <p className="text-gray-600">Top universities predicted by our ML model based on your profile</p>
          <div className="mt-4">
            <Progress value={40} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 2 of 5</p>
          </div>
        </div>

        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Please note:</strong> These recommendations are generated by our prediction model. Always verify details directly with the universities.
          </AlertDescription>
        </Alert>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
            {error}
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-gray-600">Predicting top universities for you...</p>
          </div>
        )}

        {/* Results */}
        {!loading && universities.length > 0 && (
          <>
            {/* Profile summary */}
            {application && (
              <Card className="mb-6 border-0 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Profile</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400 block">Country &amp; City</span>
                      <p className="font-medium">{countryDisplayMap[application.destination_country]}, {application.city}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Program</span>
                      <p className="font-medium">{application.program}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Level &amp; Duration</span>
                      <p className="font-medium">{levelDisplayMap[application.course_level]}, {application.duration_years} yr{Number(application.duration_years) > 1 ? "s" : ""}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Tuition</span>
                      <p className="font-medium">${Number(application.course_fee_usd).toLocaleString()}/yr</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <h2 className="text-2xl font-bold mb-4">Top {universities.length} Recommended Universities</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {universities.map((name, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{name}</CardTitle>
                      <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                    </div>
                    {application && (
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        {countryDisplayMap[application.destination_country]}, {application.city}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {application && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                          <span className="text-xs font-medium text-gray-500 block">Program Level</span>
                          <p className="text-sm font-bold text-purple-600">{levelDisplayMap[application.course_level]}</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                          <span className="text-xs font-medium text-gray-500 block">Duration</span>
                          <p className="text-sm font-bold text-orange-600">{application.duration_years} yr{Number(application.duration_years) > 1 ? "s" : ""}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                          <span className="text-xs font-medium text-gray-500 block">Tuition</span>
                          <p className="text-sm font-bold text-green-600">${Number(application.course_fee_usd).toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <span className="text-xs font-medium text-gray-500 block">Rent</span>
                          <p className="text-sm font-bold text-blue-600">${Number(application.rent_usd).toLocaleString()}</p>
                        </div>
                        <div className="col-span-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-yellow-600" />
                            <span className="text-xs font-medium text-gray-500">Predicted Ranking</span>
                          </div>
                          <p className="text-sm font-bold text-yellow-700">
                            {rankings[name] !== undefined
                              ? rankings[name] ?? "Unavailable"
                              : <span className="flex items-center gap-1 text-gray-400 font-normal"><Loader2 className="w-3 h-3 animate-spin" /> Predicting...</span>}
                          </p>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      onClick={() => handleSelect(name, index)}
                      disabled={savingIndex !== null}
                    >
                      {savingIndex === index ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                        </span>
                      ) : (
                        "Select This University"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-start">
          <Button variant="outline" onClick={() => navigate("/apply-visa")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
