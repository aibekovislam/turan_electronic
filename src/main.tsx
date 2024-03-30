import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Toastify from "./components/Toastify.tsx";
import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
  hydrate((
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toastify/>
      </Provider>
    </BrowserRouter>
  ), rootElement);
} else {
  render((
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toastify/>
      </Provider>
    </BrowserRouter>
  ), rootElement);
}
