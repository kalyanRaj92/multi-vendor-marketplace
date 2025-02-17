import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

import Register from "./components/Register";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import GroceryList from "./components/GroceryList";
import Cart from "./components/Cart";

import { CartProvider } from "./context/GroceryContext";

import "./App.css"

function App() {
  const initialOptions = {
    clientId: "Ada_tSJBalJckSa2ZxqTq1g4L48dw6GOQQidmJ9tLwb5ecxK3z3gVIbFImjLNPAH_HVRbYd1-s5sGnw0",
    currency: "USD",
    intent: "capture",
  };
  
  return (
    <CartProvider>
      <PayPalScriptProvider options={initialOptions}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={ <Register/>}/>
            <Route path="/welcome" element={ <Welcome/>}/>
            <Route path="/grocery-store" element={ <GroceryList/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    </CartProvider>
  );
}

export default App;