import {
  ClipboardCheck,
  Construction,
  ScanSearch,
  Waypoints,
} from "lucide-react";
import { BentoGrid, BentoItem } from "../ui/bento-grid";

const services = [
  {
    eyebrow: "SV.01",
    title: "Gerenciamento de obras",
    description:
      "Planejamento físico, controle de fornecedores, medição e registro técnico de ponta a ponta.",
    metric: "360°",
    metricLabel: "visão do processo",
    icon: <Construction className="h-7 w-7" aria-hidden="true" />,
    className: "md:col-span-4 md:row-span-1",
  },
  {
    eyebrow: "SV.02",
    title: "Vistoria técnica",
    description:
      "Diagnóstico visual e instrumental com relatório fotográfico, criticidade e plano de ação.",
    metric: "01",
    metricLabel: "laudo objetivo",
    icon: <ScanSearch className="h-7 w-7" aria-hidden="true" />,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    eyebrow: "SV.03",
    title: "Acompanhamento de execução",
    description:
      "Conferência de serviços críticos antes que desvios se transformem em retrabalho.",
    metric: "±2 mm",
    metricLabel: "precisão de campo",
    icon: <Waypoints className="h-7 w-7" aria-hidden="true" />,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    eyebrow: "SV.04",
    title: "Entrega e inspeção predial",
    description:
      "Checklists técnicos para recebimento de imóveis, áreas comuns e sistemas construtivos.",
    metric: "NBR",
    metricLabel: "conformidade técnica",
    icon: <ClipboardCheck className="h-7 w-7" aria-hidden="true" />,
    className: "md:col-span-2 md:row-span-1",
  },
];

export function BentoServices() {
  return (
    <section id="servicos" className="bg-brand-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_0.65fr] md:items-end">
          <div>
            <p className="section-kicker text-brand-cyan">Escopo técnico</p>
            <h2 className="section-title mt-4 max-w-3xl text-white">
              Engenharia que organiza o canteiro e protege o investimento.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-brand-line md:justify-self-end">
            Cada entrega combina presença em campo, método e comunicação clara
            para antecipar riscos e dar visibilidade real ao cliente.
          </p>
        </div>
        <BentoGrid>
          {services.map((service) => (
            <BentoItem key={service.title} {...service} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
