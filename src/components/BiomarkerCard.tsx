import { BiomarkerResult } from "@/types/biomarker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BiomarkerCardProps {
  biomarker: BiomarkerResult;
  calm?: boolean;
}

const statusColors: Record<string, { dot: string; badge: string; badgeBg: string; zone: string }> = {
  normal: { dot: "bg-status-normal", badge: "text-status-normal", badgeBg: "bg-status-normal/10", zone: "bg-status-normal" },
  borderline: { dot: "bg-status-borderline", badge: "text-status-borderline", badgeBg: "bg-status-borderline/10", zone: "bg-status-borderline" },
  critical: { dot: "bg-status-critical", badge: "text-status-critical", badgeBg: "bg-status-critical/10", zone: "bg-status-critical" },
};

export function BiomarkerCard({ biomarker, calm }: BiomarkerCardProps) {
  const { name, value, unit, status, min, max, insight } = biomarker;
  const colors = statusColors[status];

  // Calculate marker position — clamp between 0-100%
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
        {/* Name + Value */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className={`font-semibold text-foreground ${calm ? "text-lg" : "text-sm"}`}>{name}</p>
          </div>
          <div className="text-right">
            <span className={`font-bold ${calm ? "text-2xl" : "text-xl"} ${colors.badge}`}>
              {value}
            </span>
            <span className="text-xs text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>

        {/* Range Bar */}
        <div className="relative h-2 rounded-full bg-muted mb-2">
          {/* Normal zone */}
          <div
            className="absolute h-full rounded-full bg-status-normal/30"
            style={{ left: `${rangeStart}%`, width: `${rangeEnd - rangeStart}%` }}
          />
          {/* Patient marker */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-md ${colors.dot}`}
            style={{ left: `${position}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mb-3">
          <span>{min}</span>
          <span>{max}</span>
        </div>

        {/* Smart Badge */}
        <Badge variant="outline" className={`${colors.badgeBg} ${colors.badge} border-0 text-xs font-medium`}>
          {insight}
        </Badge>
      </CardContent>
    </Card>
  );
}
