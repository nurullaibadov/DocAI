import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, AlertTriangle, CheckCircle, ArrowRight,
  Brain, Thermometer, HeartPulse, Eye, Ear, Wind, Bone, Droplets
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const symptomCategories = [
  { name: "Head & Brain", icon: Brain, symptoms: ["Headache", "Dizziness", "Migraine", "Confusion", "Memory loss", "Fainting"] },
  { name: "Heart & Chest", icon: HeartPulse, symptoms: ["Chest pain", "Rapid heartbeat", "Shortness of breath", "Chest tightness", "Palpitations"] },
  { name: "Respiratory", icon: Wind, symptoms: ["Cough", "Sore throat", "Runny nose", "Wheezing", "Sneezing", "Congestion"] },
  { name: "Eyes", icon: Eye, symptoms: ["Blurred vision", "Eye pain", "Redness", "Watery eyes", "Light sensitivity"] },
  { name: "Ears", icon: Ear, symptoms: ["Ear pain", "Ringing", "Hearing loss", "Ear discharge", "Vertigo"] },
  { name: "Musculoskeletal", icon: Bone, symptoms: ["Back pain", "Joint pain", "Muscle aches", "Stiffness", "Swelling", "Weakness"] },
  { name: "Fever & General", icon: Thermometer, symptoms: ["Fever", "Fatigue", "Chills", "Night sweats", "Weight loss", "Loss of appetite"] },
  { name: "Digestive", icon: Droplets, symptoms: ["Nausea", "Vomiting", "Diarrhea", "Stomach pain", "Bloating", "Heartburn"] },
];

interface AnalysisResult {
  condition: string;
  probability: number;
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
}

const mockAnalysis = (symptoms: string[]): AnalysisResult[] => {
  const results: AnalysisResult[] = [];
  if (symptoms.some(s => ["Headache", "Fever", "Fatigue"].includes(s))) {
    results.push({
      condition: "Common Cold / Flu",
      probability: 78,
      severity: "low",
      description: "Viral upper respiratory infection with typical symptoms.",
      recommendation: "Rest, stay hydrated, and take over-the-counter fever reducers. See a doctor if symptoms persist beyond 7 days.",
    });
  }
  if (symptoms.some(s => ["Chest pain", "Shortness of breath"].includes(s))) {
    results.push({
      condition: "Possible Cardiac Issue",
      probability: 35,
      severity: "high",
      description: "Chest symptoms may indicate cardiovascular concerns requiring attention.",
      recommendation: "Seek immediate medical attention. Call emergency services if pain is severe or accompanied by arm pain.",
    });
  }
  if (symptoms.some(s => ["Back pain", "Joint pain", "Muscle aches"].includes(s))) {
    results.push({
      condition: "Musculoskeletal Strain",
      probability: 65,
      severity: "low",
      description: "Common muscle or joint strain from overuse or poor posture.",
      recommendation: "Apply ice/heat, gentle stretching, and OTC pain relievers. Consult a doctor if pain persists over 2 weeks.",
    });
  }
  if (symptoms.some(s => ["Nausea", "Stomach pain", "Bloating"].includes(s))) {
    results.push({
      condition: "Gastritis / Indigestion",
      probability: 60,
      severity: "medium",
      description: "Inflammation of the stomach lining or functional digestive issues.",
      recommendation: "Avoid spicy/acidic foods, eat smaller meals. Consider antacids. See a doctor if symptoms worsen.",
    });
  }
  if (results.length === 0) {
    results.push({
      condition: "General Health Assessment",
      probability: 50,
      severity: "low",
      description: "Your symptoms may indicate a minor condition. Monitor your health closely.",
      recommendation: "Keep tracking your symptoms. If they persist or worsen, consult a healthcare professional.",
    });
  }
  return results;
};

export default function SymptomChecker() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const allSymptoms = symptomCategories.flatMap((c) => c.symptoms);
  const filtered = search
    ? allSymptoms.filter((s) => s.toLowerCase().includes(search.toLowerCase()))
    : [];

  const toggleSymptom = (symptom: string) => {
    setSelected((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
    setResults(null);
  };

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults(mockAnalysis(selected));
      setAnalyzing(false);
    }, 2000);
  };

  const severityColor = (s: string) =>
    s === "high" ? "bg-destructive/10 text-destructive border-destructive/20"
    : s === "medium" ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
    : "bg-primary/10 text-primary border-primary/20";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              AI <span className="text-gradient">Symptom</span> Checker
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Select your symptoms and let our AI analyze potential conditions
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl mx-auto mb-8 relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search symptoms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 glass text-base"
            />
            {filtered.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 glass rounded-xl border border-border shadow-elevated z-20 max-h-60 overflow-auto">
                {filtered.map((s) => (
                  <button
                    key={s}
                    onClick={() => { toggleSymptom(s); setSearch(""); }}
                    className="w-full text-left px-4 py-3 hover:bg-muted transition-colors text-sm flex items-center justify-between"
                  >
                    {s}
                    {selected.includes(s) && <CheckCircle className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Selected */}
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.map((s) => (
                    <Badge
                      key={s}
                      className="gap-1 px-3 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer"
                      onClick={() => toggleSymptom(s)}
                    >
                      {s} <X className="w-3 h-3" />
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={analyze}
                  disabled={analyzing}
                  className="w-full gradient-primary text-primary-foreground border-0 h-12 text-base gap-2 shadow-glow hover:shadow-elevated transition-all"
                >
                  {analyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      Analyze with AI <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto mb-12 space-y-4"
              >
                <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" /> AI Analysis Results
                </h2>
                {results.map((r, i) => (
                  <motion.div
                    key={r.condition}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="glass rounded-2xl p-6 shadow-soft"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-heading font-semibold text-lg">{r.condition}</h3>
                      <Badge className={severityColor(r.severity)}>
                        {r.severity === "high" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {r.severity} risk
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-3">
                      <div
                        className="gradient-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${r.probability}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{r.description}</p>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm font-medium flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {r.recommendation}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 mt-6">
                  <p className="text-sm text-destructive flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    This is an AI-generated assessment and not a medical diagnosis. Always consult a healthcare professional for medical advice.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Symptom Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {symptomCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass rounded-2xl p-5 shadow-soft"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.symptoms.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        selected.includes(s)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
