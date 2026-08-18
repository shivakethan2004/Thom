// ─────────────────────────────────────────────────────────────────────────
// MOTION CONFIG
// Timing/easing pulled directly from the reference "Focus Pull" animation
// (the HTML file you shared). Centralized here so the whole transition can
// be tuned from one place instead of hunting through every component.
// ─────────────────────────────────────────────────────────────────────────

export const motion = {
  // Outgoing page racks OUT of focus (blur + scale up slightly)
  outDuration: 0.7, // seconds
  outEase: [0.4, 0, 0.2, 1],

  // Incoming page fades up and racks INTO focus
  inOpacityDuration: 0.52,
  inFilterDuration: 0.9,
  inEase: [0.16, 1, 0.3, 1],

  // How long the whole cycle takes before things are considered "settled"
  // (matches the original's STEP 3 reset timer)
  settleDelay: 1300, // ms

  // How long into the transition the incoming page starts animating in
  // (matches the original's 260ms stagger between steps)
  crossoverDelay: 260, // ms

  // Content stagger reveal (the ".stagger" elements in the reference file)
  staggerBase: 0.48, // seconds — base delay before the first item appears
  staggerStep: 0.1, // seconds — delay added per subsequent item
  staggerOutStep: 0.04, // seconds — quick stagger-out when leaving

  // Bloom flash + grain overlay
  bloomPeak: 0.55, // opacity at peak
  bloomInDuration: 0.5,
  bloomOutDuration: 0.42,
  grainPeak: 0.5,
};
