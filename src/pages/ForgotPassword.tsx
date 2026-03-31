import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold">AI<span className="text-gradient">Doc</span></span>
        </Link>

        {!sent ? (
          <>
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">{t("auth.resetPassword")}</h1>
            <p className="text-muted-foreground mb-8">{t("auth.resetSubtitle")}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10 h-12" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 gradient-primary text-primary-foreground border-0 shadow-glow text-base gap-2">
                {t("auth.sendResetLink")} <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading text-2xl font-bold mb-2">{t("auth.checkEmail")}</h1>
            <p className="text-muted-foreground mb-6">{t("auth.resetSent")}</p>
          </div>
        )}

        <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6">
          <ArrowLeft className="w-4 h-4" /> {t("auth.backToLogin")}
        </Link>
      </motion.div>
    </div>
  );
}
