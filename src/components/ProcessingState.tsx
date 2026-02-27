import { Brain } from "lucide-react";

export function ProcessingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 animate-in fade-in">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-medical/10 flex items-center justify-center animate-pulse">
            <Brain className="h-10 w-10 text-medical" />
          </div>
          <div className="absolute inset-0 h-20 w-20 rounded-full border-2 border-medical/30 animate-ping" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">Agent analyzing source data…</p>
          <p className="text-sm text-muted-foreground mt-1">Extracting biomarkers and generating insights</p>
        </div>
      </div>
    </div>
  );
}
