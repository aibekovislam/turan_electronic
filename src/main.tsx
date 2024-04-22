import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Toastify from "./components/Toastify.tsx";
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <HelmetProvider>
        <Provider store={store}>
          <App />
          <Toastify/>
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
);