import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold">AI<span className="text-gradient">Doc</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/symptom-checker", label: t("nav.symptomChecker") },
                { to: "/ai-chat", label: t("nav.aiDoctor") },
                { to: "/health-library", label: t("nav.healthLibrary") },
                { to: "/about", label: t("nav.about") },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item) => (
                <li key={item}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" /> support@aidoc.health
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" /> +1 (800) AI-DOC
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" /> San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t("footer.rights")}</p>
          <p className="text-xs text-muted-foreground">{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
