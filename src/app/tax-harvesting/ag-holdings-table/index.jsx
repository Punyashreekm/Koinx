import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { cn } from "@/lib/utils";
import { buildColumns } from "./columns";
import { harvestHoldingsGridTheme } from "./harvestGridTheme";

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: false,
  suppressMovable: true,
  cellStyle: {
    display: "flex",
    alignItems: "center",
  },
};

const HoldingsGrid = ({
  rowData,
  loading,
  selectedRowKeys,
  onSelectionChanged,
  showAll,
}) => {
  const apiRef = useRef(null);
  const visibleRows = useMemo(() => {
    if (!rowData?.length) return [];
    if (showAll) return rowData;
    return rowData.slice(0, 4);
  }, [rowData, showAll]);

  const columnDefs = useMemo(
    () => buildColumns(selectedRowKeys),
    [selectedRowKeys]
  );

  useEffect(() => {
    const api = apiRef.current;
    if (api) {
      api.refreshCells({ columns: ["amountToSell"], force: true });
    }
  }, [selectedRowKeys]);

  const onGridReady = useCallback(
    (e) => {
      apiRef.current = e.api;
      onSelectionChanged?.(e.api.getSelectedRows());
    },
    [onSelectionChanged]
  );

  const handleSelectionChanged = useCallback(
    (e) => {
      onSelectionChanged?.(e.api.getSelectedRows());
    },
    [onSelectionChanged]
  );

  return (
    <div
      className={cn(
        "ag-harvest-grid w-full rounded-lg bg-[#171A26]",
        loading && "min-h-[240px]",
        showAll ? "max-h-[72vh] overflow-y-auto" : "overflow-hidden"
      )}
    >
      <AgGridReact
        theme={harvestHoldingsGridTheme}
        domLayout="autoHeight"
        rowData={visibleRows}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={64}
        headerHeight={44}
        loading={loading}
        rowSelection="multiple"
        suppressRowClickSelection
        rowMultiSelectWithClick={false}
        animateRows
        getRowId={(p) => p.data.rowKey}
        onGridReady={onGridReady}
        onSelectionChanged={handleSelectionChanged}
        rowClassRules={{
          "ag-harvest-row-selected": (p) => p.node.isSelected(),
        }}
      />
    </div>
  );
};

export default HoldingsGrid;
