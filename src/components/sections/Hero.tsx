import { motion } from "framer-motion";
import { EngineeringCanvas } from "../3d/EngineeringCanvas";
import { InteractiveButton } from "../ui/interactive-button";
import { TechnicalBadge } from "../ui/technical-badge";

const metrics = [
  ["±2 mm", "controle geométrico"],
  ["NBR", "rastreabilidade"],
  ["360°", "gestão de obra"],
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-navy pb-12 pt-32 text-white lg:min-h-screen lg:pb-20 lg:pt-36"
    >
      <div className="absolute inset-0 bg-blueprint bg-[size:42px_42px] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="absolute left-[6vw] top-24 h-[calc(100%-8rem)] w-px bg-gradient-to-b from-brand-cyan/50 via-white/10 to-transparent" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <TechnicalBadge>Engenharia civil · São Paulo</TechnicalBadge>
          <h1 className="mt-8 max-w-3xl font-display text-[clamp(3rem,7vw,6.9rem)] font-medium leading-[0.89] tracking-[-0.075em]">
            Precisão que
            <span className="block text-brand-amber">sustenta</span>
            decisões.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-brand-ice/75 sm:text-lg sm:leading-8">
            Vistoria, gerenciamento e acompanhamento técnico para transformar
            cada etapa da obra em um processo previsível, documentado e seguro.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <InteractiveButton href="#contato">
              Solicitar orçamento técnico
            </InteractiveButton>
            <InteractiveButton href="#projetos" variant="secondary">
              Conhecer projetos
            </InteractiveButton>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-3 border-y border-white/10">
            {metrics.map(([value, label]) => (
              <div
                key={value}
                className="border-r border-white/10 py-5 pr-2 last:border-r-0 sm:px-5 sm:first:pl-0"
              >
                <dt className="font-display text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
                  {value}
                </dt>
                <dd className="mt-1 font-mono text-[0.55rem] uppercase leading-4 tracking-[0.14em] text-brand-line sm:text-[0.63rem]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 lg:translate-x-4 xl:translate-x-8"
        >
          <div className="absolute -left-5 top-8 z-10 hidden font-mono text-[0.58rem] uppercase tracking-[0.2em] text-brand-cyan lg:block [writing-mode:vertical-rl]">
            Modelo paramétrico / 1:50
          </div>
          <EngineeringCanvas />
        </motion.div>
      </div>
    </section>
  );
}
