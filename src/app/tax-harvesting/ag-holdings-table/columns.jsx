import { formatCrypto, formatUsd, formatUsdSigned } from "../lib/format";

const gainCell = (prefix) => (params) => {
  const g = params.data?.[prefix]?.gain;
  const bal = params.data?.[prefix]?.balance;
  const pos = g > 0;
  const neg = g < 0;
  return (
    <div className="flex h-full flex-col justify-center leading-tight">
      <span
        className={
          pos
            ? "font-medium text-[#22f56d]"
            : neg
            ? "font-medium text-[#ff4d4d]"
            : "text-neutral-500"
        }
      >
        {formatUsdSigned(g ?? 0)}
      </span>
      <span className="text-[11px] text-neutral-500">
        {formatCrypto(bal ?? 0, params.data?.coin ?? "")}
      </span>
    </div>
  );
};

export function buildColumns(selectedRowKeys) {
  const selected =
    selectedRowKeys instanceof Set ? selectedRowKeys : new Set(selectedRowKeys);

  return [
    {
      colId: "selection",
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 48,
      maxWidth: 48,
      pinned: "left",
      suppressMovable: true,
      sortable: false,
      resizable: false,
    },
    {
      headerName: "Asset",
      field: "coinName",
      minWidth: 160,
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex h-full items-center gap-2">
          <img
            src={params.data.logo}
            alt=""
            className="h-8 w-8 rounded-full bg-neutral-800 object-contain ring-1 ring-white/10"
          />
          <div className="flex flex-col justify-center leading-tight">
            <span className="font-medium text-white">
              {params.data.coinName}
            </span>
            <span className="text-xs text-neutral-500">{params.data.coin}</span>
          </div>
        </div>
      ),
    },
    {
      headerName: "Holdings (Current Market Rate)",
      field: "totalHoldings",
      minWidth: 200,
      flex: 1.2,
      cellRenderer: (params) => {
        const { totalHoldings, currentPrice, coin } = params.data;
        return (
          <div className="flex h-full flex-col justify-center leading-tight">
            <span className="font-medium text-white">
              {formatCrypto(totalHoldings, coin)}
            </span>
            <span className="text-xs text-neutral-500">
              {formatUsd(currentPrice)}/{coin}
            </span>
          </div>
        );
      },
    },
    {
      headerName: "Total Current Value",
      colId: "totalValue",
      minWidth: 140,
      flex: 0.8,
      valueGetter: (p) => p.data.totalHoldings * p.data.currentPrice,
      cellRenderer: (p) => (
        <div className="flex h-full items-center font-medium tabular-nums text-white">
          {formatUsd(p.value)}
        </div>
      ),
    },
    {
      headerName: "Short-term",
      colId: "stcg",
      minWidth: 130,
      flex: 0.9,
      /** Sort by ST gain; `stcg` on the row is an object, so a scalar valueGetter is required. */
      valueGetter: (p) => p.data?.stcg?.gain ?? 0,
      cellRenderer: gainCell("stcg"),
    },
    {
      headerName: "Long-term",
      colId: "ltcg",
      minWidth: 130,
      flex: 0.9,
      valueGetter: (p) => p.data?.ltcg?.gain ?? 0,
      cellRenderer: gainCell("ltcg"),
    },
    {
      headerName: "Amount to Sell",
      colId: "amountToSell",
      minWidth: 130,
      flex: 0.8,
      valueGetter: (p) =>
        selected.has(p.data.rowKey) ? p.data.totalHoldings : null,
      cellRenderer: (p) => {
        const v = p.value;
        return (
          <div className="flex h-full items-center text-sm font-medium tabular-nums text-neutral-300">
            {v == null
              ? "—"
              : `${Number(v).toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })} ${p.data.coin}`}
          </div>
        );
      },
    },
  ];
}
