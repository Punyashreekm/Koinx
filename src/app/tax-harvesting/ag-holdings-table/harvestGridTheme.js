import { colorSchemeDarkBlue, themeQuartz } from "ag-grid-community";

/**
 * Quartz + Dark Blue color scheme (AG Grid Theming API v33+).
 * Tuned to match KoinX Gray/01 surface and borderless layout.
 * @see https://www.ag-grid.com/react-data-grid/theming/
 */
export const harvestHoldingsGridTheme = themeQuartz
  .withPart(colorSchemeDarkBlue)
  .withParams({
    backgroundColor: "#171A26",
    chromeBackgroundColor: "#171A26",
    headerBackgroundColor: "#171A26",
    headerTextColor: "#A3A3A3",
    headerCellHoverBackgroundColor: "transparent",
    cellTextColor: "#F5F5F5",
    columnBorder: false,
    rowBorder: false,
    headerColumnBorder: false,
    headerRowBorder: false,
    selectedRowBackgroundColor: "#1E293B",
    rowHoverColor: "rgba(255, 255, 255, 0.06)",
    checkboxCheckedBackgroundColor: "#0052FE",
    checkboxCheckedBorderColor: "#0052FE",
    checkboxCheckedShapeColor: "#FFFFFF",
    checkboxUncheckedBorderColor: "#737373",
    borderColor: "rgba(255, 255, 255, 0.06)",
  });
