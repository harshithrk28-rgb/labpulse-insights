import { useState } from "react";
import { BiomarkerResult } from "@/types/biomarker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { medicalReferences } from "@/data/medicalReferences";

interface BiomarkerCardProps {
  biomarker: BiomarkerResult;
  calm?: boolean;
  comparative?: boolean;
}

const statusColors: Record<string, { dot: string; badge: string; badgeBg: string }> = {
  normal: { dot: "bg-status-normal", badge: "text-status-normal", badgeBg: "bg-status-normal/10" },
  borderline: { dot: "bg-status-borderline", badge: "text-status-borderline", badgeBg: "bg-status-borderline/10" },
  critical: { dot: "bg-status-critical", badge: "text-status-critical", badgeBg: "bg-status-critical/10" },
};

export function BiomarkerCard({ biomarker, calm, comparative }: BiomarkerCardProps) {
  const { name, value, unit, status, min, max, insight } = biomarker;
  const colors = statusColors[status];
  const ref = medicalReferences[name];
  const [open, setOpen] = useState(false);

  const rangeSpan = max - min;
  const displayMin = min - rangeSpan * 0.3;
  const displayMax = max + rangeSpan * 0.3;
  const totalSpan = displayMax - displayMin;
  const position = Math.max(0, Math.min(100, ((value - displayMin) / totalSpan) * 100));
  const rangeStart = ((min - displayMin) / totalSpan) * 100;
  const rangeEnd = ((max - displayMin) / totalSpan) * 100;

  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${calm ? "text-lg" : ""}`}>
      <CardContent className="p-5">
        {/* Name + Value + Source tooltip */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <p className={`font-semibold text-foreground ${calm ? "text-lg" : "text-sm"}`}>{name}</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-medical hover:text-medical-dark transition-colors" aria-label="Source info">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px] text-xs">
                  <p className="font-medium">Verified against Standard Medical Benchmarks</p>
                  {ref && <p className="text-muted-foreground mt-1">Source: {ref.source}</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-right">
            <span className={`font-bold ${calm ? "text-2xl" : "text-xl"} ${colors.badge}`}>{value}</span>
            <span className="text-xs text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>

        {/* Range Bar */}
        <div className="relative h-2 rounded-full bg-muted mb-2">
          <div
            className="absolute h-full rounded-full bg-status-normal/30"
            style={{ left: `${rangeStart}%`, width: `${rangeEnd - rangeStart}%` }}
          />
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-md ${colors.dot}`}
            style={{ left: `${position}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mb-3">
          <span>{min}</span>
          <span>{max}</span>
        </div>

        {/* Comparative view */}
        {comparative && ref && (
          <div className="mb-3 rounded-lg bg-secondary/50 border border-border px-3 py-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Benchmark optimal</span>
              <span className="font-medium text-foreground">{ref.optimalRange}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-muted-foreground">Your value</span>
              <span className={`font-semibold ${colors.badge}`}>{value} {unit}</span>
            </div>
          </div>
        )}

        {/* Smart Badge */}
        <Badge variant="outline" className={`${colors.badgeBg} ${colors.badge} border-0 text-xs font-medium`}>
          {insight}
        </Badge>

        {/* Expandable Medical Reference */}
        {ref && (
          <Collapsible open={open} onOpenChange={setOpen} className="mt-3">
            <CollapsibleTrigger className="flex items-center gap-1 text-xs text-medical hover:text-medical-dark transition-colors w-full">
              <Info className="h-3 w-3" />
              <span>Medical Reference</span>
              {open ? <ChevronUp className="h-3 w-3 ml-auto" /> : <ChevronDown className="h-3 w-3 ml-auto" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 text-xs text-muted-foreground space-y-1.5 border-t border-border pt-2">
              <p>{ref.description}</p>
              <p><span className="font-medium text-foreground">Significance:</span> {ref.significance}</p>
              <p className="text-[10px] italic">Source: {ref.source}</p>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
