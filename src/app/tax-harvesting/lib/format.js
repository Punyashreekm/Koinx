export function formatUsd(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return n < 0 ? `- $${formatted}` : `$${formatted}`;
}

export function formatUsdSigned(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  const sign = n > 0 ? "+" : n < 0 ? "-" : "";
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${sign}$${formatted}`;
}

export function formatCrypto(n, symbol) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return `${Number(n).toLocaleString(undefined, {
    maximumFractionDigits: 8,
  })} ${symbol}`;
}
