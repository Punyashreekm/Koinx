import React, { useCallback, useMemo, useState } from "react";

import {
  useGetCapitalGainsQuery,
  useGetHoldingsQuery,
} from "@/api/services/taxHarvesting";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DisclaimerAccordion from "./components/DisclaimerAccordion";
import ComparisonCards from "./components/ComparisonCards";
import TaxHarvestingTopbar from "./components/TaxHarvestingTopbar";
import HoldingsGrid from "./ag-holdings-table";
import { computeAfterHarvest } from "./lib/computeAfterHarvest";
import { pickRandomHelpTip } from "./lib/helpTooltipCopy";

import "./tax-harvesting.css";

const TAX_RATE_HINT = 0.32;

const TaxHarvestingPage = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [helpTip] = useState(() => pickRandomHelpTip());

  const {
    data: pre,
    isLoading: capLoading,
    isError: capError,
  } = useGetCapitalGainsQuery();
  const {
    data: holdings,
    isLoading: holdLoading,
    isError: holdError,
  } = useGetHoldingsQuery();

  const selectedRowKeys = useMemo(
    () => new Set(selectedRows.map((r) => r.rowKey)),
    [selectedRows]
  );

  const after = useMemo(
    () => (pre ? computeAfterHarvest(pre, selectedRows) : null),
    [pre, selectedRows]
  );

  const savingsUsd = useMemo(() => {
    if (!pre || !after) return 0;
    const diff = pre.realisedCapitalGains - after.effectiveCapitalGains;
    return Math.max(0, Math.round(diff * TAX_RATE_HINT));
  }, [pre, after]);

  const showSavings =
    pre &&
    after &&
    pre.realisedCapitalGains > after.effectiveCapitalGains &&
    selectedRows.length > 0;

  const onSelectionChanged = useCallback((rows) => {
    setSelectedRows(rows ?? []);
  }, []);

  const holdingsTableLoading = holdLoading;
  const error = capError || holdError;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-black">
        <TaxHarvestingTopbar />

        <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Tax Harvesting
            </h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="border-none bg-transparent p-0 text-sm font-medium text-[#0052fe] underline decoration-[#0052fe]/80 underline-offset-2 hover:text-[#3d7cff] hover:decoration-[#3d7cff]"
                >
                  How it works?
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="start"
                className="max-w-xs border border-white/10 bg-[#1f2433] p-3 text-left text-xs font-normal leading-relaxed text-neutral-100 shadow-lg"
              >
                {helpTip}
              </TooltipContent>
            </Tooltip>
          </div>

          {error ? (
            <div className="py-12 text-center text-red-400">
              Unable to load tax harvesting data. Please try again.
            </div>
          ) : (
            <div className="space-y-6">
              <DisclaimerAccordion />

              {capLoading ? (
                <div className="th-surface-card rounded-xl p-8 text-center text-neutral-400">
                  Loading summary…
                </div>
              ) : (
                <ComparisonCards
                  pre={pre}
                  after={after}
                  savingsUsd={savingsUsd}
                  showSavings={showSavings}
                />
              )}

              <section className="th-surface-card rounded-xl p-4 md:p-6">
                <h2 className="mb-3 text-lg font-semibold text-white">Holdings</h2>
                <HoldingsGrid
                  rowData={holdings}
                  loading={holdingsTableLoading}
                  selectedRowKeys={selectedRowKeys}
                  onSelectionChanged={onSelectionChanged}
                  showAll={showAll}
                />
                <button
                  type="button"
                  className="mt-3 text-sm font-semibold text-[#0052fe] hover:underline"
                  onClick={() => setShowAll((v) => !v)}
                >
                  {showAll ? "Show less" : "View all"}
                </button>
              </section>
            </div>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default TaxHarvestingPage;
