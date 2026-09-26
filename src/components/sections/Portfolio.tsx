import { useState } from "react";
import { ArrowDownRight, MoveHorizontal } from "lucide-react";

const projects = [
  {
    image: "/assets/obra-fundacao.jpg",
    location: "São Paulo / SP",
    title: "Fundação e concretagem",
    scope: "Acompanhamento executivo",
  },
  {
    image: "/assets/obra-itaim.jpg",
    location: "Itaim / SP",
    title: "Gestão de obra urbana",
    scope: "Planejamento e controle",
  },
  {
    image: "/assets/obra-vistoria.jpg",
    location: "São Paulo / SP",
    title: "Vistoria preventiva",
    scope: "Inspeção técnica",
  },
];

export function Portfolio() {
  const [comparison, setComparison] = useState(52);

  return (
    <section id="projetos" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:pt-10">
            <p className="section-kicker text-brand-blue">Projeto × execução</p>
            <h2 className="section-title mt-4 text-brand-navy">
              Do traço técnico à realidade construída.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Arraste o comparador para visualizar como a leitura de projeto
              orienta a conferência da execução no canteiro.
            </p>
            <div className="mt-10 border-l-2 border-brand-amber pl-5">
              <div className="font-display text-3xl font-semibold tracking-[-0.05em] text-brand-navy">
                Planejar. Conferir. Registrar.
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Três movimentos para reduzir riscos antes da próxima etapa.
              </p>
            </div>
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-navy">
              <img
                src="/assets/obra-fundacao.jpg"
                alt="Execução de fundação acompanhada pela AF Engenharia"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r border-brand-amber"
                style={{ width: `${comparison}%` }}
              >
                <div className="absolute inset-0 min-w-[calc(100vw-2.5rem)] sm:min-w-[700px] lg:min-w-[780px]">
                  <img
                    src="/assets/obra-itaim.jpg"
                    alt="Leitura de projeto no canteiro"
                    className="h-full w-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-brand-blue/55 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-blueprint bg-[size:30px_30px] opacity-70" />
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 z-10 w-px bg-brand-amber"
                style={{ left: `${comparison}%` }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-brand-amber bg-brand-navy text-brand-amber shadow-amber">
                  <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <div className="pointer-events-none absolute left-4 top-4 bg-brand-navy/85 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brand-cyan">
                Leitura técnica
              </div>
              <div className="pointer-events-none absolute right-4 top-4 bg-white/90 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brand-navy">
                Execução
              </div>
              <input
                type="range"
                min="12"
                max="88"
                value={comparison}
                onChange={(event) => setComparison(Number(event.target.value))}
                aria-label="Comparar leitura técnica e execução"
                className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brand-steel">
              <span>Modelo coordenado</span>
              <span>Registro de campo</span>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`group relative min-h-[27rem] overflow-hidden bg-brand-navy ${
                index === 1 ? "md:translate-y-8" : ""
              }`}
            >
              <img
                src={project.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="mb-5 flex items-center justify-between border-b border-white/20 pb-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brand-cyan">
                  <span>PRJ.0{index + 1}</span>
                  <span>{project.location}</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.04em]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-brand-line">{project.scope}</p>
                  </div>
                  <ArrowDownRight
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-brand-amber transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
