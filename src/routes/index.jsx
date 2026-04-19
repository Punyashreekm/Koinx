import { lazy } from "react";

export const privateRoutes = [
  {
    index: true,
    element: lazy(() => import("@/app/tax-harvesting")),
  },
];
