import { motion } from "framer-motion";
import { Heart, Shield, Users, Globe, Award, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const } }),
};

const values = [
  { icon: Heart, title: "Patient First", desc: "Every feature is designed with your health and wellbeing as the top priority." },
  { icon: Shield, title: "Privacy & Security", desc: "Your health data is encrypted and never shared with third parties." },
  { icon: Users, title: "Accessibility", desc: "Making quality health information available to everyone, everywhere." },
  { icon: Globe, title: "Global Reach", desc: "Serving users in 150+ countries with multilingual support." },
  { icon: Award, title: "Medical Accuracy", desc: "Our AI is trained on peer-reviewed medical literature and validated by doctors." },
  { icon: Lightbulb, title: "Innovation", desc: "Continuously improving our AI models with the latest medical research." },
];

const team = [
  { name: "Dr. Sarah Mitchell", role: "Chief Medical Officer", bio: "Former Head of Internal Medicine at Johns Hopkins" },
  { name: "Alex Chen", role: "CEO & Co-founder", bio: "Ex-Google Health, Stanford CS & Medicine" },
  { name: "Dr. Priya Sharma", role: "Head of AI Research", bio: "PhD in Biomedical AI, MIT" },
  { name: "James Walker", role: "CTO", bio: "Previously VP Engineering at Epic Systems" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">AIDoc</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're on a mission to make healthcare accessible, understandable, and proactive for everyone.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="gradient-primary rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="relative z-10 max-w-2xl">
              <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
                Our Mission
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/90 text-lg leading-relaxed">
                AIDoc combines cutting-edge artificial intelligence with medical expertise to provide instant,
                reliable health insights. We believe everyone deserves access to quality healthcare guidance,
                regardless of location, time, or resources.
              </motion.p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-4xl font-bold text-center mb-12">
              Our <span className="text-gradient-accent">Values</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div key={v.title} variants={fadeUp} custom={i} className="glass rounded-2xl p-6 shadow-soft">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-4xl font-bold text-center mb-12">
              Meet the <span className="text-gradient">Team</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((t, i) => (
                <motion.div key={t.name} variants={fadeUp} custom={i} className="glass rounded-2xl p-6 text-center shadow-soft">
                  <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-heading font-bold text-primary-foreground">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold">{t.name}</h3>
                  <p className="text-sm text-primary font-medium">{t.role}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
