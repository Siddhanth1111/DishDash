import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { RecoilRoot } from "recoil";

const PUBLISHABLE_KEY = "pk_test_cHJvdWQtZmx5LTczLmNsZXJrLmFjY291bnRzLmRldiQ";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
  </RecoilRoot>
);
