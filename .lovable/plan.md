

## LabPulse AI — Dual Upload & Dashboard Implementation

### Step 1: Create mock data & types
- Define TypeScript types for biomarker results (name, value, unit, status, range, insight)
- Create mock JSON response with 15+ biomarkers (Glucose, HbA1c, Cholesterol, LDL, HDL, Triglycerides, TSH, Free T4, Vitamin D, B12, Iron, Ferritin, Calcium, Creatinine, eGFR, ALT, AST, WBC, Hemoglobin, Platelets)
- Include benchmark ranges, smart insight text, and AI summary

### Step 2: Build the Landing / Upload Screen
- LabPulse AI branding header with clean white design
- Two upload options side by side:
  - **PDF Dropzone**: Drag-and-drop area with file icon, accepts .pdf files, shows filename on drop
  - **Text Area**: Large paste area with placeholder text like "Paste your lab results here..."
- "Analyze" button below both options
- Processing logic: PDF → POST `/api/analyze/pdf` as FormData; Text → POST `/api/analyze/text` as JSON
- Both calls intercepted to return mock data for now

### Step 3: AI Processing State
- After submit, show a loading state: pulsing brain icon + "Agent analyzing source data..."
- Simulate 2-second delay before showing results
- Smooth transition into dashboard view

### Step 4: AI Insight Header
- Large card at top with AI-generated summary text (Grade 6 readability)
- High contrast, generous font size
- Green/blue tone for mostly normal, amber accent if items flagged

### Step 5: Biomarker Cards Grid
- Responsive grid of cards for all 15+ markers
- Each card contains:
  - Biomarker name and patient value with unit
  - **Benchmark Range Bar**: horizontal bar with green/yellow/red zones, dot marker for patient value, min/max labels
  - **Smart Badge**: contextual insight text (e.g., "Optimal Range: 70–99 mg/dL") color-coded green/amber/red

### Step 6: Calm Mode Toggle
- Toggle in the dashboard header labeled "Calm Mode"
- ON: hide normal-range biomarkers, show only flagged items + reassuring summary, softer palette, larger text
- Smooth fade transition between modes

### Step 7: Design Polish
- Clean clinical white background, subtle card shadows, rounded corners
- Medical blue accent color, generous whitespace
- Status colors: green (normal), amber (borderline), red (critical)

