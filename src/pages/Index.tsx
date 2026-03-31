import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, Stethoscope, MessageCircle, Shield, Clock, Users,
  ArrowRight, Sparkles, Activity, HeartPulse, Zap, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Index() {
  const { t } = useLanguage();

  const features = [
    { icon: Brain, title: t("features.aiSymptom"), description: t("features.aiSymptomDesc"), color: "from-primary to-primary/70" },
    { icon: MessageCircle, title: t("features.aiChat"), description: t("features.aiChatDesc"), color: "from-accent to-accent/70" },
    { icon: Stethoscope, title: t("features.monitoring"), description: t("features.monitoringDesc"), color: "from-primary to-accent" },
    { icon: Shield, title: t("features.security"), description: t("features.securityDesc"), color: "from-accent to-primary" },
    { icon: Clock, title: t("features.instant"), description: t("features.instantDesc"), color: "from-primary to-primary/70" },
    { icon: Users, title: t("features.family"), description: t("features.familyDesc"), color: "from-accent to-accent/70" },
  ];

  const stats = [
    { value: "2M+", label: t("stats.healthChecks"), icon: Activity },
    { value: "98%", label: t("stats.accuracy"), icon: Zap },
    { value: "500K+", label: t("stats.users"), icon: HeartPulse },
    { value: "24/7", label: t("stats.available"), icon: Clock },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Working Mom", text: "AIDoc helped me understand my child's symptoms at 2 AM when I couldn't reach our pediatrician. The AI was incredibly accurate!", rating: 5 },
    { name: "Dr. Michael Chen", role: "General Practitioner", text: "I recommend AIDoc to my patients for initial symptom assessment. It's remarkably thorough and helps reduce unnecessary ER visits.", rating: 5 },
    { name: "Emily Rodriguez", role: "Fitness Enthusiast", text: "The health tracking features are amazing. I can monitor my vitals and get AI-powered recommendations for my training.", rating: 5 },
  ];

  const steps = [
    { step: "01", title: t("how.step1"), desc: t("how.step1Desc") },
    { step: "02", title: t("how.step2"), desc: t("how.step2Desc") },
    { step: "03", title: t("how.step3"), desc: t("how.step3Desc") },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden gradient-hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              {t("hero.title1")}{" "}
              <span className="text-gradient">{t("hero.title2")}</span>{" "}
              {t("hero.title3")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/symptom-checker">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow hover:shadow-elevated transition-all text-base px-8 h-12 gap-2">
                  {t("hero.checkSymptoms")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/ai-chat">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2 glass">
                  <MessageCircle className="w-4 h-4" />
                  {t("hero.talkAI")}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 md:p-6 text-center shadow-soft">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="font-heading text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-5xl font-bold mb-4">
              {t("features.title1")}{" "}
              <span className="text-gradient">{t("features.title2")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("features.subtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group glass rounded-2xl p-6 md:p-8 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-5xl font-bold mb-4">
              {t("how.title")} <span className="text-gradient">AIDoc</span> {t("how.works")}
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("how.subtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative text-center"
              >
                <div className="text-6xl font-heading font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-5xl font-bold mb-4">
              {t("testimonials.title")} <span className="text-gradient-accent">{t("testimonials.highlight")}</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((item, i) => (
              <motion.div
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass rounded-2xl p-6 md:p-8 shadow-soft"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{item.text}"</p>
                <div>
                  <div className="font-heading font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="gradient-primary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="relative z-10">
              <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t("cta.title")}
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
                {t("cta.subtitle")}
              </motion.p>
              <motion.div variants={fadeUp} custom={2}>
                <Link to="/register">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 px-8 text-base gap-2">
                    {t("cta.button")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
