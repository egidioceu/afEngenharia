import {
  useRef,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
} from "react";

export function SpotlightCard({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: ReactMouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !cardRef.current) return;

    cardRef.current.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      className={`spotlight-card relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
