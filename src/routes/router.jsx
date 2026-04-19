import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

import Spinner from "@/components/spinner";
import { privateRoutes } from "@/routes";
import AppBootstrap from "@/providers/AppBootstrap";
import MainLayout from "@/layouts/main-layout";

const Router = () => {
  return (
    <AppBootstrap>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {renderRoutes(privateRoutes)}
        </Route>
      </Routes>
    </AppBootstrap>
  );
};

export default Router;

function renderRoutes(routes) {
  return routes.map((route, i) => {
    const Element = route.element;
    return (
      <Route
        key={`route-${i}`}
        index={route.index}
        path={route.path}
        element={
          <Suspense fallback={<Spinner />}>
            <Element />
          </Suspense>
        }
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
}
