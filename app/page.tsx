"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  FlaskConical,
  ShieldCheck,
  Zap,
} from "lucide-react";
import "@fontsource/instrument-serif/400.css";

const SAMPLE_FLAGS = [
  {
    name: "Hemoglobin",
    value: "9.2 g/dL",
    ref: "13.5–17.5",
    level: "critical",
    note: "Lower than normal — may indicate anemia.",
  },
  {
    name: "Blood Glucose",
    value: "118 mg/dL",
    ref: "70–100",
    level: "warning",
    note: "Slightly high — consider dietary changes.",
  },
  {
    name: "Creatinine",
    value: "0.9 mg/dL",
    ref: "0.7–1.2",
    level: "normal",
    note: "Kidney function looks healthy.",
  },
  {
    name: "WBC Count",
    value: "11.4 K/uL",
    ref: "4.5–11.0",
    level: "warning",
    note: "Slightly elevated — could signal mild infection.",
  },
];

const levelCard: Record<string, string> = {
  critical: "bg-red-50 border border-red-200",
  warning:  "bg-amber-50 border border-amber-200",
  normal:   "bg-emerald-50 border border-emerald-200",
};

const levelText: Record<string, string> = {
  critical: "text-red-700",
  warning:  "text-amber-700",
  normal:   "text-emerald-700",
};

const levelBadge: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  warning:  "bg-amber-100 text-amber-700 border-amber-200",
  normal:   "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const levelIcon: Record<string, React.ReactNode> = {
  critical: <AlertTriangle className="w-3.5 h-3.5" />,
  warning:  <AlertTriangle className="w-3.5 h-3.5" />,
  normal:   <CheckCircle2 className="w-3.5 h-3.5" />,
};

const SAMPLE_REPORT = `CBC Report - Patient: John Doe
Hemoglobin: 9.2 g/dL (Ref: 13.5-17.5)
WBC Count: 11.4 K/uL (Ref: 4.5-11.0)
Blood Glucose (Fasting): 118 mg/dL (Ref: 70-100)
Creatinine: 0.9 mg/dL (Ref: 0.7-1.2)
Platelets: 210 K/uL (Ref: 150-400)`;

export default function Home() {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!report.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 2000);
  };

  const handleReset = () => {
    setReport("");
    setAnalyzed(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-neutral-900">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-600" />
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              Medosta
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="text-xs text-emerald-700 border-emerald-200 bg-emerald-50"
            >
              Powered by Gemini
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              GitHub
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-14">
          <Badge
            variant="outline"
            className="mb-5 text-xs px-3 py-1 border-neutral-300 text-neutral-400"
          >
            GDG Vibecode · Team Antigravity
          </Badge>
          <h1
            className="text-5xl sm:text-6xl font-normal text-neutral-900 leading-tight mb-4"
            style={{ fontFamily: "Instrument Serif, serif" }}
          >
            Your lab report,{" "}
            <span className="italic text-emerald-600">explained simply.</span>
          </h1>
          <p className="text-neutral-500 text-lg max-w-lg mx-auto leading-relaxed">
            Paste any medical report. Medosta uses Gemini AI to translate it
            into plain language and flag what needs your attention.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { icon: <Zap className="w-3.5 h-3.5" />, label: "Instant analysis" },
            { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Risk flagging" },
            { icon: <FlaskConical className="w-3.5 h-3.5" />, label: "Any lab format" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-1.5 text-xs text-neutral-500 border border-neutral-200 rounded-full px-3 py-1.5 bg-white"
            >
              {f.icon}
              {f.label}
            </div>
          ))}
        </div>

        {/* Input area */}
        {!analyzed ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-neutral-700">
                Paste your report
              </p>
              <button
                onClick={() => setReport(SAMPLE_REPORT)}
                className="text-xs text-emerald-600 hover:underline"
              >
                Load sample
              </button>
            </div>
            <textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="e.g. CBC Report — Hemoglobin: 9.2 g/dL (Ref: 13.5–17.5)..."
              rows={8}
              className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 leading-relaxed"
            />
            <Button
              onClick={handleAnalyze}
              disabled={!report.trim() || loading}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-11 text-sm font-medium"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing with Gemini...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Analyze report
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Summary */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-3">
                Summary
              </p>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Your CBC report shows a few values outside the normal range.
                Your hemoglobin is low, which may suggest mild anemia — this
                means your blood may be carrying less oxygen than ideal. Your
                white blood cell count is slightly high, which can happen with
                minor infections. Blood glucose is a little elevated — worth
                watching with diet. Everything else looks fine.
              </p>
            </div>

            {/* Risk flags */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-3">
                Risk flags
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAMPLE_FLAGS.map((flag) => (
                  <div
                    key={flag.name}
                    className={`rounded-xl p-4 ${levelCard[flag.level]}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-neutral-500">
                        {flag.name}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-xs font-medium border rounded-full px-2 py-0.5 ${levelBadge[flag.level]}`}
                      >
                        {levelIcon[flag.level]}
                        {flag.level}
                      </span>
                    </div>
                    <p className={`text-lg font-semibold ${levelText[flag.level]}`}>
                      {flag.value}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Ref: {flag.ref}
                    </p>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      {flag.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-3">
                Suggested next steps
              </p>
              <ul className="space-y-2.5">
                {[
                  "Consult your doctor about the low hemoglobin reading.",
                  "Monitor fasting blood glucose with dietary adjustments.",
                  "Retest WBC count in 2–4 weeks if symptoms persist.",
                  "Maintain hydration and continue regular checkups.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer + reset */}
            <p className="text-xs text-neutral-400 text-center leading-relaxed">
              Medosta is not a medical device. Always consult a qualified
              healthcare professional for diagnosis and treatment.
            </p>
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-xs text-neutral-400 hover:text-neutral-600 underline"
              >
                Analyze another report
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}