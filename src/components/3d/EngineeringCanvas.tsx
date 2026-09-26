import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box, Calculator, Layers3 } from "lucide-react";
import {
  StructuralModel,
  type VisualizationMode,
} from "./StructuralModel";

const modes: {
  value: VisualizationMode;
  shortLabel: string;
  label: string;
  icon: typeof Calculator;
}[] = [
  {
    value: "wireframe",
    shortLabel: "Cálculo",
    label: "Modo Wireframe / Cálculo",
    icon: Calculator,
  },
  {
    value: "solid",
    shortLabel: "BIM",
    label: "Modo Sólido / BIM",
    icon: Box,
  },
  {
    value: "stress",
    shortLabel: "Esforços",
    label: "Mapa de Esforços / Stress Tensor",
    icon: Layers3,
  },
];

function LowPowerFallback() {
  return (
    <div
      className="structural-fallback h-full min-h-[22rem] w-full"
      aria-label="Representação esquemática de um pórtico estrutural"
      role="img"
    >
      <svg viewBox="0 0 620 440" className="h-full w-full" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M100 350V170l210-75 210 75v180M100 350h420M100 170h420M310 95v255" />
          <path d="M100 350l210-255 210 255M100 170l210 180 210-180" opacity=".55" />
          <path d="M72 378h476M72 390h476" opacity=".24" />
        </g>
        <g fill="currentColor">
          <circle cx="100" cy="350" r="7" />
          <circle cx="310" cy="350" r="7" />
          <circle cx="520" cy="350" r="7" />
          <circle cx="100" cy="170" r="7" />
          <circle cx="310" cy="95" r="7" />
          <circle cx="520" cy="170" r="7" />
        </g>
      </svg>
    </div>
  );
}

export function EngineeringCanvas() {
  const [mode, setMode] = useState<VisualizationMode>("wireframe");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const deviceNavigator = navigator as Navigator & { deviceMemory?: number };
    const updatePreferences = () => {
      setReducedMotion(mediaQuery.matches);
      setLowPower(
        window.innerWidth < 480 &&
          (deviceNavigator.deviceMemory ?? 4) <= 4 &&
          navigator.hardwareConcurrency <= 4,
      );
    };
    const updateScroll = () => {
      scrollProgress.current = Math.min(window.scrollY / 1800, 1);
    };

    updatePreferences();
    updateScroll();
    mediaQuery.addEventListener("change", updatePreferences);
    window.addEventListener("resize", updatePreferences, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", updatePreferences);
      window.removeEventListener("resize", updatePreferences);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div className="relative h-full min-h-[32rem] w-full overflow-hidden border border-white/10 bg-brand-ink">
      <div className="pointer-events-none absolute inset-0 bg-blueprint bg-[size:32px_32px] opacity-45" />
      <div className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brand-cyan/70">
        AF / Structural Node 01
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 text-right font-mono text-[0.6rem] uppercase leading-5 tracking-[0.16em] text-white/40">
        X 23.5505°
        <br />Y 46.6333°
      </div>

      {lowPower ? (
        <LowPowerFallback />
      ) : (
        <Canvas
          camera={{ position: [7.2, 4.2, 8.5], fov: 36 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          fallback={<LowPowerFallback />}
        >
          <color attach="background" args={["#050B14"]} />
          <ambientLight intensity={1.25} />
          <directionalLight position={[5, 8, 6]} intensity={2.4} color="#D9EEFF" />
          <pointLight position={[-5, -1, 3]} intensity={12} color="#0E74A8" />
          <pointLight position={[4, 1, -4]} intensity={9} color="#F4B91F" />
          <Suspense fallback={null}>
            <StructuralModel
              mode={mode}
              scrollProgress={scrollProgress}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      )}

      <div
        className="absolute bottom-4 left-4 right-4 z-10 grid grid-cols-3 gap-1 border border-white/10 bg-brand-ink/85 p-1 backdrop-blur-md"
        aria-label="Modos de visualização técnica"
      >
        {modes.map(({ value, shortLabel, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-label={label}
            aria-pressed={mode === value}
            className={`flex min-h-12 items-center justify-center gap-2 px-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cyan ${
              mode === value
                ? "bg-brand-amber text-brand-ink"
                : "text-brand-line hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            <Icon aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
