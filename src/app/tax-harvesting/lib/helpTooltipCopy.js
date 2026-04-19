/** Placeholder copy shown in the “How it works?” tooltip (one line picked at random). */
export const HELP_TOOLTIP_VARIANTS = [
  "Tax-loss harvesting matches realized losses against gains in the same period. Your actual outcome depends on filing rules where you owe tax.",
  "Short-term vs. long-term labels follow typical holding-period rules; some regions treat everything as one bucket—double-check with a qualified advisor.",
  "Prices come from CoinGecko snapshots; exchange fills and fees can shift cost basis versus what you see here.",
  "Selecting rows simulates selling those lots for harvesting. It is not a trade instruction—connect your exchange or tax workflow for real execution.",
  "Savings estimates use simplified rate assumptions for demo purposes only; they are not legal, tax, or investment advice.",
];

export function pickRandomHelpTip() {
  const i = Math.floor(Math.random() * HELP_TOOLTIP_VARIANTS.length);
  return HELP_TOOLTIP_VARIANTS[i];
}
