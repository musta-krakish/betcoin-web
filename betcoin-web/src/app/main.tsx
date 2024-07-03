import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { SDKProvider } from "@tma.js/sdk-react";

import App from "./App.tsx";

// https://github.com/Telegram-Mini-Apps/reactjs-template/blob/870554c6a5c72a7dc9cc0691e294ce44ec3d1bf0/src/index.tsx#L7
// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import "./mockEnv.ts";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <SDKProvider>
        <App />
      </SDKProvider>
    </Provider>
  </BrowserRouter>,
);
