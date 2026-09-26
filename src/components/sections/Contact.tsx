import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { brand } from "../../config/brand";

type FormData = {
  name: string;
  phone: string;
  projectType: string;
  details: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  phone: "",
  projectType: "",
  details: "",
};

function validateField(name: keyof FormData, value: string) {
  if (name === "name" && value.trim().length < 3) return "Informe seu nome completo.";
  if (name === "phone" && value.replace(/\D/g, "").length < 10) {
    return "Informe um telefone com DDD.";
  }
  if (name === "projectType" && !value) return "Selecione o tipo de demanda.";
  if (name === "details" && value.trim().length < 15) {
    return "Conte um pouco mais sobre o projeto.";
  }
  return "";
}

export function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(name: keyof FormData, value: string) {
    setSubmitted(false);
    setForm((current) => ({ ...current, [name]: value }));
    if (value || errors[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = Object.fromEntries(
      (Object.keys(form) as (keyof FormData)[])
        .map((key) => [key, validateField(key, form[key])])
        .filter(([, message]) => message),
    ) as FormErrors;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = [
      "Olá, AF Engenharia! Gostaria de solicitar uma avaliação técnica.",
      "",
      `Nome: ${form.name}`,
      `Telefone: ${form.phone}`,
      `Demanda: ${form.projectType}`,
      `Briefing: ${form.details}`,
    ].join("\n");

    window.open(
      `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-brand-navy py-24 sm:py-32">
      <div className="absolute inset-0 bg-blueprint bg-[size:36px_36px] opacity-35" />
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-12 xl:px-16">
        <div>
          <p className="section-kicker text-brand-cyan">Briefing inicial</p>
          <h2 className="section-title mt-4 text-white">
            Sua obra precisa de uma decisão técnica clara?
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-brand-line">
            Descreva a demanda. A AF organiza as informações iniciais e retorna
            com o próximo passo mais adequado.
          </p>
          <div className="mt-12 space-y-5 border-t border-white/10 pt-8">
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-cyan">
                Atendimento
              </div>
              <div className="mt-2 font-display text-lg text-white">São Paulo e região</div>
            </div>
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-cyan">
                Canal técnico
              </div>
              <a
                className="mt-2 inline-block font-display text-lg text-white underline decoration-white/20 underline-offset-4 hover:decoration-brand-amber"
                href={`mailto:${brand.email}`}
              >
                {brand.email}
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="border border-white/10 bg-brand-ink/65 p-5 backdrop-blur-sm sm:p-8 lg:p-10"
        >
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-brand-cyan">
              Nova solicitação / AF-01
            </div>
            <div className="h-2 w-2 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="name"
              label="Nome"
              value={form.name}
              error={errors.name}
              placeholder="Seu nome completo"
              onChange={(value) => updateField("name", value)}
            />
            <Field
              id="phone"
              label="Telefone / WhatsApp"
              type="tel"
              value={form.phone}
              error={errors.phone}
              placeholder="(11) 99999-9999"
              onChange={(value) => updateField("phone", value)}
            />
            <div className="sm:col-span-2">
              <label
                htmlFor="projectType"
                className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-line"
              >
                Tipo de demanda
              </label>
              <select
                id="projectType"
                value={form.projectType}
                onChange={(event) => updateField("projectType", event.target.value)}
                onBlur={(event) => updateField("projectType", event.target.value)}
                aria-invalid={Boolean(errors.projectType)}
                aria-describedby={errors.projectType ? "projectType-error" : undefined}
                className="form-control"
              >
                <option value="">Selecione uma opção</option>
                <option>Gerenciamento de obra</option>
                <option>Vistoria técnica</option>
                <option>Acompanhamento de execução</option>
                <option>Inspeção de entrega / imóvel</option>
                <option>Outro serviço de engenharia</option>
              </select>
              {errors.projectType && (
                <p id="projectType-error" className="form-error">
                  {errors.projectType}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="details"
                className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-line"
              >
                Contexto da obra ou projeto
              </label>
              <textarea
                id="details"
                rows={5}
                value={form.details}
                onChange={(event) => updateField("details", event.target.value)}
                onBlur={(event) => updateField("details", event.target.value)}
                aria-invalid={Boolean(errors.details)}
                aria-describedby={errors.details ? "details-error" : undefined}
                placeholder="Local, etapa atual, área aproximada e principal necessidade..."
                className="form-control resize-none"
              />
              <div className="mt-2 flex items-start justify-between gap-4">
                <div>
                  {errors.details && (
                    <p id="details-error" className="form-error mt-0">
                      {errors.details}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[0.58rem] text-white/35">
                  {form.details.length}/500
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-xs text-xs leading-5 text-white/45">
              Ao enviar, o briefing será aberto no WhatsApp para sua confirmação.
            </p>
            <button
              type="submit"
              className="group flex min-h-12 w-full items-center justify-center gap-3 bg-brand-amber px-5 font-display text-sm font-semibold text-brand-ink transition-colors hover:bg-[#ffd14f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan sm:w-auto"
            >
              Enviar briefing
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
          {submitted && (
            <div
              role="status"
              className="mt-5 flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Briefing preparado no WhatsApp.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
};

function Field({
  id,
  label,
  value,
  placeholder,
  error,
  type = "text",
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-line"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="form-control"
      />
      {error && (
        <p id={`${id}-error`} className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}
