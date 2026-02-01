import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, MapPin, TrendingUp, AlertCircle, Clock, Award, ArrowUpDown } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { useState } from "react";

interface University {
  id: number;
  name: string;
  country: string;
  worldRanking: string;
  predictedRank: number;
  tuition: string;
  programLevel: string;
  duration: string;
}

const universitiesData: University[] = [
  {
    id: 1,
    name: "Massachusetts Institute of Technology",
    country: "United States",
    worldRanking: "#1",
    predictedRank: 1,
    tuition: "$53,790/year",
    programLevel: "Master's",
    duration: "2 years",
  },
  {
    id: 2,
    name: "Stanford University",
    country: "United States",
    worldRanking: "#2",
    predictedRank: 2,
    tuition: "$56,169/year",
    programLevel: "Master's",
    duration: "2 years",
  },
  {
    id: 3,
    name: "University of Cambridge",
    country: "United Kingdom",
    worldRanking: "#3",
    predictedRank: 3,
    tuition: "£33,825/year",
    programLevel: "Master's",
    duration: "1 year",
  },
  {
    id: 4,
    name: "University of Toronto",
    country: "Canada",
    worldRanking: "#16",
    predictedRank: 4,
    tuition: "CAD $58,160/year",
    programLevel: "Master's",
    duration: "2 years",
  },
  {
    id: 5,
    name: "University of Oxford",
    country: "United Kingdom",
    worldRanking: "#4",
    predictedRank: 5,
    tuition: "£32,760/year",
    programLevel: "PhD",
    duration: "3-4 years",
  },
  {
    id: 6,
    name: "ETH Zurich",
    country: "Switzerland",
    worldRanking: "#7",
    predictedRank: 6,
    tuition: "CHF 1,460/year",
    programLevel: "Master's",
    duration: "2 years",
  },
];

export default function UniversityRecommendationsPage() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("predictedRank");
  
  const sortUniversities = (universities: University[], sortKey: string) => {
    const sorted = [...universities];
    
    switch (sortKey) {
      case "predictedRank":
        return sorted.sort((a, b) => a.predictedRank - b.predictedRank);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "worldRanking":
        return sorted.sort((a, b) => {
          const rankA = parseInt(a.worldRanking.replace("#", ""));
          const rankB = parseInt(b.worldRanking.replace("#", ""));
          return rankA - rankB;
        });
      case "programLevel":
        return sorted.sort((a, b) => a.programLevel.localeCompare(b.programLevel));
      default:
        return sorted;
    }
  };

  const sortedUniversities = sortUniversities(universitiesData, sortBy);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/apply-visa")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Visa Application</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">University Recommendations & Rankings 🎓</h1>
          <p className="text-gray-600">Based on your profile and preferences</p>
          <div className="mt-4">
            <Progress value={40} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 2 of 5</p>
          </div>
        </div>

        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Please note:</strong> The university ranking predictions shown here are based on various factors and algorithms. These predictions are not 100% accurate and should be used as guidance only. Always verify official rankings from authoritative sources.
          </AlertDescription>
        </Alert>

        {/* Sort Options */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <div className="flex items-center gap-3">
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="predictedRank">Predicted Rank</SelectItem>
                <SelectItem value="worldRanking">World Ranking</SelectItem>
                <SelectItem value="name">University Name</SelectItem>
                <SelectItem value="programLevel">Program Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* University Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {sortedUniversities.map((university) => (
            <Card key={university.id} className="hover:shadow-xl transition-shadow border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl mb-2">{university.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-base">
                  <MapPin className="w-4 h-4" />
                  {university.country}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* University Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-700">World Ranking</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{university.worldRanking}</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-gray-700">Tuition Fee</span>
                    </div>
                    <p className="text-sm font-bold text-green-600">{university.tuition}</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-gray-700">Program Level</span>
                    </div>
                    <p className="text-sm font-bold text-purple-600">{university.programLevel}</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-medium text-gray-700">Duration</span>
                    </div>
                    <p className="text-sm font-bold text-orange-600">{university.duration}</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={() => navigate("/visa-agency-recommendations")}
                >
                  Select University
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Buttons */}
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