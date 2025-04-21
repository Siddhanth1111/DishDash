import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { CartProvider } from "./context/cartContext";

import LeaveOutletGuard from "./components/LeaveOutletGuard";

const PUBLISHABLE_KEY = "pk_test_cHJvdWQtZmx5LTczLmNsZXJrLmFjY291bnRzLmRldiQ";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ClerkProvider>
  </CartProvider>
);
