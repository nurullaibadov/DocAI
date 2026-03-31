import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, RotateCcw, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  "I have a persistent headache",
  "What are signs of dehydration?",
  "How to improve sleep quality?",
  "When should I see a doctor?",
  "Tips for reducing stress",
  "What vitamins should I take?",
];

const aiResponses: Record<string, string> = {
  headache: `## Headache Assessment 🧠

Based on your description, here are some insights:

**Common causes of persistent headaches:**
- **Tension headaches** — stress, poor posture, or eye strain
- **Dehydration** — not drinking enough water
- **Sleep issues** — too little or too much sleep
- **Migraine** — often with light/sound sensitivity

### Recommended Actions
1. **Stay hydrated** — drink at least 8 glasses of water daily
2. **Rest** in a dark, quiet room for 20-30 minutes
3. **Over-the-counter relief** — ibuprofen or acetaminophen as directed
4. **Track triggers** — food, stress, sleep patterns

> ⚠️ **See a doctor if:** headaches are sudden/severe, worsen over time, or come with vision changes, fever, or neck stiffness.`,

  dehydration: `## Signs of Dehydration 💧

Watch for these symptoms:

| Mild | Moderate | Severe |
|------|----------|--------|
| Thirst | Dark urine | Confusion |
| Dry mouth | Dizziness | Rapid heartbeat |
| Fatigue | Headache | Fainting |

### Prevention Tips
- Drink **8-10 glasses** of water daily
- Increase intake during exercise or hot weather
- Eat water-rich foods (cucumbers, watermelon)
- Monitor urine color — pale yellow is ideal

> 💡 **Pro tip:** Set reminders to drink water every hour!`,

  sleep: `## Improving Sleep Quality 😴

### Sleep Hygiene Checklist
- ✅ Keep a consistent sleep schedule (even weekends)
- ✅ Make your room **cool, dark, and quiet**
- ✅ Avoid screens 1 hour before bed
- ✅ No caffeine after 2 PM
- ✅ Exercise regularly (but not within 3 hours of bedtime)

### Relaxation Techniques
1. **4-7-8 Breathing** — inhale 4s, hold 7s, exhale 8s
2. **Progressive muscle relaxation**
3. **Guided meditation** apps

> 🎯 **Goal:** 7-9 hours of quality sleep for adults.`,

  doctor: `## When to See a Doctor 🏥

### Seek immediate care for:
- 🔴 Chest pain or difficulty breathing
- 🔴 Sudden severe headache
- 🔴 Signs of stroke (face drooping, arm weakness, speech difficulty)
- 🔴 High fever (>103°F / 39.4°C)
- 🔴 Severe allergic reactions

### Schedule an appointment for:
- Symptoms lasting more than **2 weeks**
- Unexplained weight loss
- Persistent fatigue
- New or changing skin lesions
- Recurring pain or discomfort

> 🩺 **Remember:** Trust your instincts. If something feels wrong, it's always better to get checked.`,

  stress: `## Stress Reduction Guide 🧘

### Quick Relief (5 minutes)
- **Box breathing**: Inhale 4s → Hold 4s → Exhale 4s → Hold 4s
- **Grounding technique**: Name 5 things you see, 4 you touch, 3 you hear
- **Progressive muscle relaxation**

### Long-term Strategies
1. **Regular exercise** — 30 min, 5 days/week
2. **Mindfulness meditation** — start with 10 min/day
3. **Social connections** — talk to friends/family
4. **Time management** — prioritize and delegate
5. **Limit news/social media** consumption

### When Stress Becomes Too Much
If you experience persistent anxiety, panic attacks, or depression, please reach out to a mental health professional. **You're not alone.**`,

  vitamins: `## Essential Vitamins & Supplements 💊

### Most People Need
| Vitamin | Benefit | Source |
|---------|---------|--------|
| **Vitamin D** | Bone & immune health | Sunlight, fish, fortified milk |
| **B12** | Energy & nerve function | Meat, eggs, dairy |
| **Omega-3** | Heart & brain health | Fish, walnuts, flaxseed |
| **Magnesium** | Sleep & muscle recovery | Nuts, leafy greens |

### Before Supplementing
1. Get a **blood test** to check actual levels
2. **Food first** — supplements complement, not replace
3. Consult your doctor about interactions
4. Choose **third-party tested** brands

> ⚠️ **Note:** More is not always better. Excess vitamins can be harmful.`,
};

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("headache") || lower.includes("head")) return aiResponses.headache;
  if (lower.includes("dehydrat") || lower.includes("water")) return aiResponses.dehydration;
  if (lower.includes("sleep") || lower.includes("insomnia")) return aiResponses.sleep;
  if (lower.includes("doctor") || lower.includes("hospital") || lower.includes("emergency")) return aiResponses.doctor;
  if (lower.includes("stress") || lower.includes("anxi")) return aiResponses.stress;
  if (lower.includes("vitamin") || lower.includes("supplement")) return aiResponses.vitamins;
  return `Thank you for your question! Based on what you've described, here are some general thoughts:

**General Health Advice:**
- Monitor your symptoms and note any changes
- Stay hydrated and maintain a balanced diet
- Get adequate rest and regular exercise
- Keep a symptom journal to identify patterns

If your symptoms persist or worsen, I recommend consulting with a healthcare professional for a thorough evaluation.

> 💡 *I'm an AI health assistant. For specific medical advice, please consult a licensed healthcare provider.*

**Would you like to:**
- Tell me more specific symptoms?
- Ask about a particular condition?
- Learn about preventive health measures?`;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! 👋 I'm your **AI Health Assistant**. I can help you understand symptoms, provide health tips, and guide you on when to seek medical care.\n\n*How can I help you today?*",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { role: "assistant", content: getAIResponse(text) };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const reset = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! 👋 I'm your **AI Health Assistant**. How can I help you today?",
      },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col pt-16 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-pulse-glow">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-semibold text-sm">AI Health Assistant</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Online • Powered by AI</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={reset} title="Reset chat">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                  msg.role === "user"
                    ? "gradient-primary text-primary-foreground"
                    : "glass shadow-soft"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none text-foreground prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-td:text-foreground prose-th:text-foreground prose-blockquote:text-muted-foreground prose-a:text-primary">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="glass rounded-2xl px-5 py-4 shadow-soft">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div className="px-4 md:px-6 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Quick questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs px-3 py-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 md:px-6 py-4 border-t border-border glass">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex gap-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms or ask a health question..."
              className="flex-1 h-12 glass text-base"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="gradient-primary text-primary-foreground border-0 h-12 w-12 p-0 shadow-glow"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            ⚠️ AI responses are informational only. Always consult a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
