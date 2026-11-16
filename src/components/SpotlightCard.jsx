import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function SpotlightCard({
  children,
  className = '',
  delay = 0,
  hoverLift = true,
  as = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverLift ? { y: -3 } : undefined}
      className={`spotlight-surface ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...props}
    >
      <div
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity,
          transition: 'opacity 300ms ease',
          background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, var(--spotlight-color, rgba(18, 86, 212, 0.075)), transparent 45%)`,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </Component>
  );
}
