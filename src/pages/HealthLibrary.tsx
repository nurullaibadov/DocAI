import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Heart, Brain, Apple, Dumbbell, Moon, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { name: "All", icon: BookOpen },
  { name: "Heart Health", icon: Heart },
  { name: "Mental Health", icon: Brain },
  { name: "Nutrition", icon: Apple },
  { name: "Fitness", icon: Dumbbell },
  { name: "Sleep", icon: Moon },
  { name: "Prevention", icon: Shield },
];

const articles = [
  { title: "Understanding Blood Pressure: A Complete Guide", category: "Heart Health", readTime: "8 min", excerpt: "Learn about systolic and diastolic pressure, what the numbers mean, and how to maintain healthy levels." },
  { title: "10 Signs You May Be Experiencing Anxiety", category: "Mental Health", readTime: "6 min", excerpt: "Recognize the physical and emotional signs of anxiety and learn coping strategies that actually work." },
  { title: "The Mediterranean Diet: Science-Backed Benefits", category: "Nutrition", readTime: "10 min", excerpt: "Discover why this ancient diet pattern is one of the most studied and recommended by cardiologists." },
  { title: "Building a Sustainable Exercise Routine", category: "Fitness", readTime: "7 min", excerpt: "Start small, stay consistent. Here's how to create a workout plan you'll actually stick with." },
  { title: "Sleep Hygiene: 12 Tips for Better Rest", category: "Sleep", readTime: "5 min", excerpt: "Transform your sleep quality with these evidence-based habits and environmental adjustments." },
  { title: "Vaccines You Need as an Adult", category: "Prevention", readTime: "6 min", excerpt: "Stay up to date with recommended immunizations for every stage of adulthood." },
  { title: "Managing Diabetes Through Diet", category: "Nutrition", readTime: "9 min", excerpt: "Practical meal planning strategies for controlling blood sugar and improving quality of life." },
  { title: "The Science of Stress and Your Body", category: "Mental Health", readTime: "8 min", excerpt: "How chronic stress affects every system in your body and evidence-based ways to reduce it." },
  { title: "Heart Attack Warning Signs Women Ignore", category: "Heart Health", readTime: "5 min", excerpt: "Women's heart attack symptoms often differ from men's. Learn what to watch for." },
  { title: "HIIT vs Steady-State Cardio: Which Is Better?", category: "Fitness", readTime: "7 min", excerpt: "Comparing two popular cardio approaches for weight loss, heart health, and overall fitness." },
  { title: "How Blue Light Affects Your Sleep", category: "Sleep", readTime: "4 min", excerpt: "The impact of screens on your circadian rhythm and practical steps to minimize disruption." },
  { title: "Cancer Screening Guidelines by Age", category: "Prevention", readTime: "8 min", excerpt: "Stay proactive with recommended screenings for early detection of common cancers." },
];

export default function HealthLibrary() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat = active === "All" || a.category === active;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Health <span className="text-gradient">Library</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Evidence-based health articles curated by medical professionals
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 glass text-base"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === c.name
                    ? "gradient-primary text-primary-foreground shadow-soft"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                <c.icon className="w-4 h-4" />
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{a.category}</Badge>
                  <span className="text-xs text-muted-foreground">{a.readTime} read</span>
                </div>
                <h3 className="font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
