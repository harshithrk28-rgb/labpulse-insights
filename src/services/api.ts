import { LabAnalysisResponse, BiomarkerResult, BiomarkerStatus } from "@/types/biomarker";
import { mockLabResults } from "@/data/mockLabResults";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

/** Shape returned by the Spring Boot backend */
interface BackendBiomarker {
  name: string;
  value: number;
  unit: string;
  flag: "Normal" | "High" | "Low" | "Borderline" | "Critical" | string;
  min: number;
  max: number;
  insight: string;
}

interface BackendResponse {
  summary: string;
  flaggedCount: number;
  totalCount: number;
  biomarkers: BackendBiomarker[];
}

/** Map the backend flag string to our frontend status enum */
function mapFlag(flag: string): BiomarkerStatus {
  const f = flag.toLowerCase();
  if (f === "normal") return "normal";
  if (f === "high" || f === "low" || f === "borderline") return "borderline";
  if (f === "critical") return "critical";
  return "borderline";
}

function mapResponse(raw: BackendResponse): LabAnalysisResponse {
  return {
    summary: raw.summary,
    flaggedCount: raw.flaggedCount,
    totalCount: raw.totalCount,
    biomarkers: raw.biomarkers.map(
      (b): BiomarkerResult => ({
        name: b.name,
        value: b.value,
        unit: b.unit,
        status: mapFlag(b.flag),
        min: b.min,
        max: b.max,
        insight: b.insight,
      })
    ),
  };
}

/**
 * Upload a PDF file to the Spring Boot backend.
 * The backend expects a MultipartFile field named "file".
 */
export async function analyzePdf(file: File): Promise<LabAnalysisResponse> {
  // Fall back to mock data when no backend URL is configured
  if (!API_BASE) {
    await new Promise((r) => setTimeout(r, 2000));
    return mockLabResults;
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Backend error: ${res.status} ${res.statusText}`);
  }

  const raw: BackendResponse = await res.json();
  return mapResponse(raw);
}

/**
 * Send pasted text to the Spring Boot backend.
 */
export async function analyzeText(text: string): Promise<LabAnalysisResponse> {
  if (!API_BASE) {
    await new Promise((r) => setTimeout(r, 2000));
    return mockLabResults;
  }

  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error(`Backend error: ${res.status} ${res.statusText}`);
  }

  const raw: BackendResponse = await res.json();
  return mapResponse(raw);
}
