import store, { persistor } from "store/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n"

/* 
Sentry.init({
  dsn: 'https://32914519a6a94575bc896519a9ee6fe6@o850707.ingest.sentry.io/5817665',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: 'production',
})
 */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <BrowserRouter>
      <App />
        </BrowserRouter>
    </PersistGate>
  </Provider>
);
