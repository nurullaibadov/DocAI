import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, LogIn, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, languageNames, type Language } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/symptom-checker", label: t("nav.symptomChecker") },
    { path: "/ai-chat", label: t("nav.aiDoctor") },
    { path: "/health-library", label: t("nav.healthLibrary") },
    { path: "/about", label: t("nav.about") },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              AI<span className="text-gradient">Doc</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" title="Change language">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {(Object.keys(languageNames) as Language[]).map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={language === lang ? "bg-primary/10 text-primary font-medium" : ""}
                  >
                    {languageNames[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9" title="Toggle theme">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogIn className="w-4 h-4" />
                {t("nav.login")}
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0 shadow-soft hover:shadow-glow transition-shadow">
                {t("nav.getStarted")}
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border/30"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Language selector in mobile */}
              <div className="px-4 py-2">
                <p className="text-xs text-muted-foreground mb-2">🌐 Language</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        language === lang
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-2 pt-2 border-t border-border">
                <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full" size="sm">{t("nav.login")}</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button className="w-full gradient-primary text-primary-foreground border-0" size="sm">{t("nav.getStarted")}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
