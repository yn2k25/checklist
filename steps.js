// steps.js
// Replace this file with your generated steps data.
window.FKR_STEPS = window.FKR_STEPS || [
  {
    id: "step1",
    number: 1,
    title: "What type of interaction is this?",
    section: "Start",
    phase: "Start",
    pill: "Start",
    bodyHtml: "<p>Choose one to begin.</p>",
    actions: [
      { type: "goto", label: "Scheduled appointment", target: "step2", style: "outline" },
      { type: "goto", label: "Walk in", target: "step3", style: "outline" }
    ]
  }
];
