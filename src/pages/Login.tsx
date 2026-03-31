import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@aidoc.com" && password === "admin123") {
      toast({ title: "Welcome back!", description: "Redirecting to admin panel..." });
      setTimeout(() => window.location.href = "/admin", 1000);
      return;
    }
    toast({ title: "Login successful!", description: "Welcome back to AIDoc." });
  };

  return (
    <div className="min-h-screen flex gradient-hero">
      <div className="hidden lg:flex flex-1 items-center justify-center gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative z-10 text-center px-12">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">{t("auth.welcomeBack")}</h2>
          <p className="text-primary-foreground/80 max-w-sm mx-auto">{t("auth.welcomeBackSubtitle")}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">AI<span className="text-gradient">Doc</span></span>
          </Link>

          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">{t("auth.signIn")}</h1>
          <p className="text-muted-foreground mb-8">{t("auth.signInSubtitle")}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">{t("auth.forgotPassword")}</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 h-12" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 gradient-primary text-primary-foreground border-0 shadow-glow text-base gap-2">
              {t("auth.signIn")} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t("auth.noAccount")}{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">{t("auth.createOne")}</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
