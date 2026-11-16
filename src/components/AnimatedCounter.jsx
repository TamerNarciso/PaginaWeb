import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

export function AnimatedCounter({ value, suffix = '', duration = 1.4 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayVal}
      {suffix}
    </span>
  );
}
