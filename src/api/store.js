import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { taxHarvestingApi } from "./services/taxHarvesting";

const setUpStore = () => {
  const store = configureStore({
    reducer: {
      [taxHarvestingApi.reducerPath]: taxHarvestingApi.reducer,
    },
    middleware: (getDM) =>
      getDM().concat(taxHarvestingApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = setUpStore();
