import { cn } from "@/lib/utils";
import { formatUsd } from "../lib/format";

function MetricTable({ data, variant }) {
  const isBlue = variant === "after";
  return (
    <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-2 text-sm">
      <div />
      <div
        className={cn(
          "text-right text-xs font-medium uppercase tracking-wide",
          isBlue ? "text-white/75" : "text-neutral-500"
        )}
      >
        Short-term
      </div>
      <div
        className={cn(
          "text-right text-xs font-medium uppercase tracking-wide",
          isBlue ? "text-white/75" : "text-neutral-500"
        )}
      >
        Long-term
      </div>

      <div className={cn(isBlue ? "text-white/90" : "text-neutral-400")}>Profits</div>
      <div className={cn("text-right tabular-nums", isBlue ? "text-white" : "text-white")}>
        {formatUsd(data.shortTerm.profits)}
      </div>
      <div className={cn("text-right tabular-nums", isBlue ? "text-white" : "text-white")}>
        {formatUsd(data.longTerm.profits)}
      </div>

      <div className={cn(isBlue ? "text-white/90" : "text-neutral-400")}>Losses</div>
      <div className={cn("text-right tabular-nums", isBlue ? "text-white" : "text-white")}>
        {formatUsd(-data.shortTerm.losses)}
      </div>
      <div className={cn("text-right tabular-nums", isBlue ? "text-white" : "text-white")}>
        {formatUsd(-data.longTerm.losses)}
      </div>

      <div className={cn("font-medium", isBlue ? "text-white/90" : "text-neutral-300")}>
        Net Capital Gains
      </div>
      <div className={cn("text-right font-semibold tabular-nums", isBlue ? "text-white" : "text-white")}>
        {formatUsd(data.shortTerm.netCapitalGains)}
      </div>
      <div className={cn("text-right font-semibold tabular-nums", isBlue ? "text-white" : "text-white")}>
        {formatUsd(data.longTerm.netCapitalGains)}
      </div>
    </div>
  );
}

const ComparisonCards = ({ pre, after, savingsUsd, showSavings }) => {
  if (!pre || !after) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="th-surface-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white">Pre Harvesting</h2>
        <MetricTable data={pre} variant="pre" />
        <p className="mt-6 border-t border-white/10 pt-4 text-base font-bold text-white">
          Realised Capital Gains:{" "}
          <span className="tabular-nums">{formatUsd(pre.realisedCapitalGains)}</span>
        </p>
      </section>

      <section className="rounded-xl bg-[#0052fe] p-6 text-white shadow-lg shadow-[#0052fe]/20">
        <h2 className="text-lg font-semibold">After Harvesting</h2>
        <MetricTable data={after} variant="after" />
        <p className="mt-6 border-t border-white/25 pt-4 text-base font-bold">
          Effective Capital Gains:{" "}
          <span className="tabular-nums">{formatUsd(after.effectiveCapitalGains)}</span>
        </p>
        {showSavings && savingsUsd > 0 && (
          <p className="mt-3 flex items-center gap-2 rounded-lg bg-black/20 px-3 py-2 text-sm font-medium text-white">
            <span aria-hidden>🎉</span>
            You are going to save upto {formatUsd(savingsUsd)}.
          </p>
        )}
      </section>
    </div>
  );
};

export default ComparisonCards;
