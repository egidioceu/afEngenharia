import { Check, Crosshair, FileCheck2, Ruler, ShieldCheck } from "lucide-react";
import { SpotlightCard } from "../ui/spotlight-card";

const checks = [
  ["NBR 6118", "Estruturas de concreto", "VALIDADO"],
  ["NBR 15575", "Desempenho habitacional", "VALIDADO"],
  ["TOL. GEO", "Controle dimensional", "± 2.0 MM"],
  ["DOC. OBRA", "Rastreabilidade técnica", "ATIVO"],
];

const capabilities = [
  {
    icon: Crosshair,
    title: "Leitura crítica de projeto",
    text: "Compatibilização entre o previsto, as condições reais e a sequência executiva.",
  },
  {
    icon: Ruler,
    title: "Controle dimensional",
    text: "Verificações objetivas para reduzir desvios acumulados entre etapas.",
  },
  {
    icon: FileCheck2,
    title: "Registro rastreável",
    text: "Evidências fotográficas, pendências, responsáveis e prazos em uma linha do tempo clara.",
  },
];

export function EngineeringCapabilities() {
  return (
    <section className="overflow-hidden bg-brand-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-kicker text-brand-blue">Método AF</p>
            <h2 className="section-title mt-4 text-brand-navy">
              Decisões amparadas por dados de campo.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Acompanhamos pontos críticos antes, durante e depois da execução.
              O resultado é menos improviso, mais previsibilidade e uma obra
              tecnicamente documentada.
            </p>
            <div className="mt-10 space-y-3">
              {capabilities.map(({ icon: Icon, title, text }, index) => (
                <SpotlightCard
                  key={title}
                  className="border border-brand-navy/10 bg-white p-5 shadow-[0_12px_40px_rgba(7,27,54,.05)]"
                >
                  <div className="relative z-10 flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-navy text-brand-amber">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[0.6rem] text-brand-steel">
                          0{index + 1}
                        </span>
                        <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-brand-navy">
                          {title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-blueprint bg-[size:28px_28px] opacity-70" />
            <div className="relative border border-brand-cyan/20 bg-brand-navy p-5 shadow-technical sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-cyan">
                    AF / Compliance Console
                  </div>
                  <div className="mt-2 font-display text-xl font-medium text-white">
                    Verificação de conformidade
                  </div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                {checks.map(([code, label, status], index) => (
                  <div
                    key={code}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-white/[0.08] bg-white/[0.025] px-3 py-4 sm:grid-cols-[5.2rem_1fr_auto] sm:px-4"
                  >
                    <span className="font-mono text-[0.62rem] text-brand-cyan">{code}</span>
                    <span className="text-xs text-brand-line sm:text-sm">{label}</span>
                    <span
                      className={`flex items-center gap-1.5 font-mono text-[0.55rem] tracking-[0.1em] ${
                        index === 2 ? "text-brand-amber" : "text-emerald-300"
                      }`}
                    >
                      <Check className="h-3 w-3" aria-hidden="true" />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-white/40">
                <span>Última leitura 14:32:08</span>
                <span className="text-right text-emerald-300">Sistema nominal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
