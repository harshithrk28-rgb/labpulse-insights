import { useState } from "react";
import { Shield, ArrowLeft, BarChart3 } from "lucide-react";
import { LabAnalysisResponse } from "@/types/biomarker";
import { BiomarkerCard } from "@/components/BiomarkerCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  data: LabAnalysisResponse;
  onBack: () => void;
}

export function Dashboard({ data, onBack }: DashboardProps) {
  const [calmMode, setCalmMode] = useState(false);
  const [comparative, setComparative] = useState(false);

  const flagged = data.biomarkers.filter((b) => b.status !== "normal");
  const displayed = calmMode ? flagged : data.biomarkers;

  const calmSummary =
    "Most of your results are within a healthy range. The items shown below just need a little attention — nothing to worry about. Your doctor can help with simple next steps.";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> New analysis
          </Button>
          <div className="flex items-center gap-5">
            <Label htmlFor="comparative" className="text-sm text-muted-foreground cursor-pointer flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" /> Comparative
            </Label>
            <Switch id="comparative" checked={comparative} onCheckedChange={setComparative} />
            <div className="w-px h-5 bg-border" />
            <Label htmlFor="calm" className="text-sm text-muted-foreground cursor-pointer flex items-center gap-1.5">
              <Shield className="h-4 w-4" /> Calm Mode
            </Label>
            <Switch id="calm" checked={calmMode} onCheckedChange={setCalmMode} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex-1">
        {/* AI Insight Header */}
        <div
          className={`rounded-2xl p-6 md:p-8 mb-8 transition-colors duration-300 ${
            calmMode
              ? "bg-status-normal/5 border border-status-normal/20"
              : data.flaggedCount > 0
              ? "bg-status-borderline/5 border border-status-borderline/20"
              : "bg-status-normal/5 border border-status-normal/20"
          }`}
        >
          <p className={`leading-relaxed text-foreground ${calmMode ? "text-xl" : "text-lg"}`}>
            {calmMode ? calmSummary : data.summary}
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            {calmMode
              ? `${flagged.length} item${flagged.length !== 1 ? "s" : ""} to review`
              : `${data.totalCount} biomarkers analyzed · ${data.flaggedCount} flagged`}
          </p>
        </div>

        {/* Biomarker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in">
          {displayed.map((b) => (
            <BiomarkerCard key={b.name} biomarker={b} calm={calmMode} comparative={comparative} />
          ))}
        </div>

        {calmMode && flagged.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-status-normal font-medium">All clear! ✨</p>
            <p className="text-muted-foreground mt-2">All your biomarkers are within healthy ranges.</p>
          </div>
        )}
      </main>

      {/* Disclaimer Footer */}
      <footer className="border-t border-border bg-muted/30 py-4 mt-8">
        <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto px-4">
          This AI summary is for informational purposes and should be discussed with a healthcare professional.
        </p>
      </footer>
    </div>
  );
}
