import { useState } from "react";
import { UploadScreen } from "@/components/UploadScreen";
import { ProcessingState } from "@/components/ProcessingState";
import { Dashboard } from "@/components/Dashboard";
import { LabAnalysisResponse } from "@/types/biomarker";
import { analyzePdf, analyzeText } from "@/services/api";
import { toast } from "sonner";

type AppState = "upload" | "processing" | "dashboard";

const Index = () => {
  const [state, setState] = useState<AppState>("upload");
  const [results, setResults] = useState<LabAnalysisResponse | null>(null);

  const handleSubmit = async (type: "pdf" | "text", data: File | string) => {
    setState("processing");

    try {
      const response =
        type === "pdf"
          ? await analyzePdf(data as File)
          : await analyzeText(data as string);

      setResults(response);
      setState("dashboard");
    } catch (err) {
      console.error("Analysis failed:", err);
      toast.error("Analysis failed. Please try again.");
      setState("upload");
    }
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
