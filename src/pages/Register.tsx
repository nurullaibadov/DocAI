import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Register() {
  const [showPw, setShowPw] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Account created!", description: "Welcome to AIDoc." });
  };

  return (
    <div className="min-h-screen flex gradient-hero">
      <div className="hidden lg:flex flex-1 items-center justify-center gradient-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative z-10 text-center px-12">
          <div className="w-16 h-16 rounded-2xl bg-accent-foreground/20 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-accent-foreground mb-4">{t("auth.joinTitle")}</h2>
          <p className="text-accent-foreground/80 max-w-sm mx-auto">{t("auth.joinSubtitle")}</p>
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

          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">{t("auth.createAccount")}</h1>
          <p className="text-muted-foreground mb-8">{t("auth.createSubtitle")}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("auth.firstName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="firstName" placeholder="John" className="pl-10 h-12" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                <Input id="lastName" placeholder="Doe" className="h-12" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10 h-12" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type={showPw ? "text" : "password"} placeholder="Min 8 characters" className="pl-10 pr-10 h-12" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 gradient-primary text-primary-foreground border-0 shadow-glow text-base gap-2">
              {t("auth.createAccount")} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t("auth.hasAccount")}{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">{t("auth.signInLink")}</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
