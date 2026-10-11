// CSS is the single source for timing, distance and spring parameters.
export function motionTokens() {
  const style = getComputedStyle(document.documentElement);
  const number = name => Number(style.getPropertyValue(`--motion-${name}`));
  const stiffness = number('stiffness'), damping = number('damping'), mass = number('mass');
  // Sample a damped spring for native WAAPI/CSS linear(), with a small settling tail.
  const omega = Math.sqrt(stiffness / mass), zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  const points = Array.from({length:41}, (_, i) => {
    const t = i / 40 * number('feedback') / 1000;
    return i === 40 ? 1 : 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + zeta * omega / wd * Math.sin(wd * t));
  });
  const spring = `linear(${points.map(n=>n.toFixed(5)).join(',')})`;
  return {number, ease:style.getPropertyValue('--motion-ease').trim(), spring};
}
