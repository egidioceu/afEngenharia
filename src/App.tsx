import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BentoServices } from "./components/sections/BentoServices";
import { Contact } from "./components/sections/Contact";
import { EngineeringCapabilities } from "./components/sections/EngineeringCapabilities";
import { Hero } from "./components/sections/Hero";
import { Portfolio } from "./components/sections/Portfolio";
import { brand } from "./config/brand";

const navItems = [
  ["Serviços", "#servicos"],
  ["Método", "#metodo"],
  ["Projetos", "#projetos"],
  ["Contato", "#contato"],
] as const;

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#inicio"
      className="group inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
      aria-label="AF Engenharia e Projetos — início"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center border font-display text-lg font-semibold tracking-[-0.08em] ${
          light
            ? "border-white/20 bg-white/[0.04] text-white"
            : "border-brand-navy/20 text-brand-navy"
        }`}
      >
        AF
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[0.76rem] font-semibold uppercase tracking-[0.08em] ${
            light ? "text-white" : "text-brand-navy"
          }`}
        >
          Engenharia
        </span>
        <span
          className={`mt-1 block font-mono text-[0.5rem] uppercase tracking-[0.17em] ${
            light ? "text-brand-line" : "text-brand-steel"
          }`}
        >
          & Projetos
        </span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-brand-navy/95 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        <BrandMark light />
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-line transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cyan"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="hidden border border-brand-amber px-4 py-3 font-display text-xs font-semibold text-brand-amber transition-colors hover:bg-brand-amber hover:text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan md:inline-flex"
        >
          Iniciar briefing
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center border border-white/15 text-white md:hidden"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="border-t border-white/10 bg-brand-navy px-5 py-6 md:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-xl text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-ink py-10 text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12 xl:px-16">
        <div>
          <BrandMark light />
          <p className="mt-5 max-w-sm text-sm leading-6 text-brand-line">
            {brand.tagline} Vistoria e gerenciamento de obras em São Paulo.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-left md:text-right">
          <a
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-cyan hover:text-white"
          >
            Instagram / @afengenhariaeprojetos
          </a>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-brand-line">
            © {new Date().getFullYear()} AF Engenharia & Projetos
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-4 top-3 z-[100] -translate-y-24 bg-brand-amber px-4 py-3 font-semibold text-brand-ink transition-transform focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <BentoServices />
        <div id="metodo">
          <EngineeringCapabilities />
        </div>
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
