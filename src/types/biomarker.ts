export type BiomarkerStatus = "normal" | "borderline" | "critical";

export interface BiomarkerResult {
  name: string;
  value: number;
  unit: string;
  status: BiomarkerStatus;
  min: number;
  max: number;
  insight: string;
}

export interface LabAnalysisResponse {
  summary: string;
  flaggedCount: number;
  totalCount: number;
  biomarkers: BiomarkerResult[];
}
