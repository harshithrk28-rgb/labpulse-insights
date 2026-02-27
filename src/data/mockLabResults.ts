import { LabAnalysisResponse } from "@/types/biomarker";

export const mockLabResults: LabAnalysisResponse = {
  summary:
    "Your lab results look mostly healthy. Most of your values fall within the normal range. Your Vitamin D is a bit low, and your LDL cholesterol is slightly elevated. These are common findings and easy to address with small lifestyle changes. Talk to your doctor about simple next steps.",
  flaggedCount: 4,
  totalCount: 20,
  biomarkers: [
    { name: "Glucose", value: 92, unit: "mg/dL", status: "normal", min: 70, max: 99, insight: "Optimal Range: 70–99 mg/dL" },
    { name: "HbA1c", value: 5.4, unit: "%", status: "normal", min: 4.0, max: 5.6, insight: "Well controlled — no diabetes risk" },
    { name: "Total Cholesterol", value: 210, unit: "mg/dL", status: "borderline", min: 125, max: 200, insight: "Slightly above target — diet adjustments may help" },
    { name: "LDL Cholesterol", value: 138, unit: "mg/dL", status: "borderline", min: 0, max: 100, insight: "Above optimal — consider heart-healthy diet" },
    { name: "HDL Cholesterol", value: 58, unit: "mg/dL", status: "normal", min: 40, max: 100, insight: "Good level — protective for heart health" },
    { name: "Triglycerides", value: 142, unit: "mg/dL", status: "normal", min: 0, max: 150, insight: "Within normal range" },
    { name: "TSH", value: 2.1, unit: "mIU/L", status: "normal", min: 0.4, max: 4.0, insight: "Thyroid function is normal" },
    { name: "Free T4", value: 1.2, unit: "ng/dL", status: "normal", min: 0.8, max: 1.8, insight: "Normal thyroid hormone level" },
    { name: "Vitamin D", value: 22, unit: "ng/mL", status: "borderline", min: 30, max: 100, insight: "Below target — consider supplementation" },
    { name: "Vitamin B12", value: 480, unit: "pg/mL", status: "normal", min: 200, max: 900, insight: "Healthy B12 levels" },
    { name: "Iron", value: 85, unit: "µg/dL", status: "normal", min: 60, max: 170, insight: "Iron stores are adequate" },
    { name: "Ferritin", value: 72, unit: "ng/mL", status: "normal", min: 12, max: 300, insight: "Normal iron reserves" },
    { name: "Calcium", value: 9.4, unit: "mg/dL", status: "normal", min: 8.5, max: 10.5, insight: "Calcium is well balanced" },
    { name: "Creatinine", value: 1.0, unit: "mg/dL", status: "normal", min: 0.6, max: 1.2, insight: "Kidney function looks good" },
    { name: "eGFR", value: 95, unit: "mL/min", status: "normal", min: 90, max: 120, insight: "Kidneys are filtering well" },
    { name: "ALT", value: 28, unit: "U/L", status: "normal", min: 7, max: 56, insight: "Liver enzyme is normal" },
    { name: "AST", value: 24, unit: "U/L", status: "normal", min: 10, max: 40, insight: "Liver function is healthy" },
    { name: "WBC", value: 11.2, unit: "K/µL", status: "critical", min: 4.5, max: 11.0, insight: "Slightly elevated — may indicate infection or stress" },
    { name: "Hemoglobin", value: 14.5, unit: "g/dL", status: "normal", min: 12.0, max: 17.5, insight: "Healthy hemoglobin level" },
    { name: "Platelets", value: 245, unit: "K/µL", status: "normal", min: 150, max: 400, insight: "Platelet count is normal" },
  ],
};
