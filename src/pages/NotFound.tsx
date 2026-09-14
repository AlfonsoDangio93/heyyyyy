import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-secondary py-24">
        <Reveal threshold={0} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            <p className="font-display text-fluid-4xl font-normal leading-none text-primary">404</p>
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <span className="h-1.5 w-12 rounded-full bg-primary" />
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
              <span className="h-1.5 w-5 rounded-full bg-secondary-strong" />
            </span>
            <h1 className="font-display text-fluid-2xl font-normal text-primary">{t("notFound.title")}</h1>
            <p className="text-lg text-muted-foreground">{t("notFound.subtitle")}</p>
            <Button asChild size="lg" className="px-8 text-lg">
              <Link to="/">{t("notFound.cta")}</Link>
            </Button>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
