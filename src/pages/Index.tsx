import { useState } from "react";
import { UploadScreen } from "@/components/UploadScreen";
import { ProcessingState } from "@/components/ProcessingState";
import { Dashboard } from "@/components/Dashboard";
import { mockLabResults } from "@/data/mockLabResults";
import { LabAnalysisResponse } from "@/types/biomarker";

type AppState = "upload" | "processing" | "dashboard";

const Index = () => {
  const [state, setState] = useState<AppState>("upload");
  const [results, setResults] = useState<LabAnalysisResponse | null>(null);

  const handleSubmit = async (type: "pdf" | "text", data: File | string) => {
    setState("processing");

    // Simulate API call — in production this would POST to /api/analyze/pdf or /api/analyze/text
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return mock data for now
    setResults(mockLabResults);
    setState("dashboard");
  };

  const handleBack = () => {
    setState("upload");
    setResults(null);
  };

  if (state === "processing") return <ProcessingState />;
  if (state === "dashboard" && results) return <Dashboard data={results} onBack={handleBack} />;
  return <UploadScreen onSubmit={handleSubmit} />;
};

export default Index;
