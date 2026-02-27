import { useState, useCallback } from "react";
import { FileText, Upload, ClipboardPaste } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface UploadScreenProps {
  onSubmit: (type: "pdf" | "text", data: File | string) => void;
}

export function UploadScreen({ onSubmit }: UploadScreenProps) {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") {
      setFile(dropped);
      setText("");
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setText("");
    }
  };

  const handleTextChange = (val: string) => {
    setText(val);
    if (val) setFile(null);
  };

  const canSubmit = !!file || text.trim().length > 10;

  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      {/* Header */}
      <header className="w-full py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-9 w-9 rounded-lg bg-medical flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            LabPulse <span className="text-medical">AI</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          Upload your lab report or paste your results to get instant, easy-to-understand health insights.
        </p>
      </header>

      {/* Upload Area */}
      <div className="w-full max-w-3xl px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PDF Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all cursor-pointer min-h-[220px] ${
              dragOver
                ? "border-medical bg-medical/5"
                : file
                ? "border-status-normal bg-status-normal/5"
                : "border-border hover:border-medical/50 bg-card"
            }`}
            onClick={() => document.getElementById("pdf-input")?.click()}
          >
            <input
              id="pdf-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />
            <Upload className={`h-10 w-10 mb-3 ${file ? "text-status-normal" : "text-muted-foreground"}`} />
            {file ? (
              <>
                <p className="font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">PDF ready for analysis</p>
              </>
            ) : (
              <>
                <p className="font-medium text-foreground">Drop PDF here</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
              </>
            )}
          </div>

          {/* Text Paste */}
          <div className="flex flex-col rounded-xl border bg-card p-4 min-h-[220px]">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardPaste className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Paste results</span>
            </div>
            <Textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={"Paste your lab results here...\n\nExample:\nGlucose: 92 mg/dL\nHbA1c: 5.4%\nCholesterol: 210 mg/dL"}
              className="flex-1 resize-none border-0 bg-muted/30 focus-visible:ring-1 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            disabled={!canSubmit}
            onClick={() => {
              if (file) onSubmit("pdf", file);
              else if (text.trim()) onSubmit("text", text);
            }}
            className="px-10 bg-medical hover:bg-medical-dark text-white rounded-full text-base font-semibold shadow-md"
          >
            Analyze Results
          </Button>
        </div>
      </div>
    </div>
  );
}
