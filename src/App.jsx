import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import { Toaster } from "@/components/ui/sonner";

import Router from "@/routes/router";
import { store } from "@/api/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <div className="max-w-[1440px] mx-auto min-h-screen bg-background"> */}
        <Router />
        {/* </div> */}
        <Toaster richColors />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
