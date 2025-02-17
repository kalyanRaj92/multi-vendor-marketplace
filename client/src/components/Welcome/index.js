import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="w-main-container">
      <div className="w-text-container">
        <p className="w-title">Welcome to</p>
        <h1 className="w-heading">Grocery Store :)</h1>
        <p className="w-description">
          Your one-stop destination for fresh produce, quality groceries, and
          everyday essentials. We pride ourselves on providing the best
          selection at unbeatable prices.
        </p>
        <ul className="w-features-list">
          <li>Fresh and Organic Produce</li>
          <li>Daily Essentials and Bakery Items</li>
          <li>Quality Meat and Seafood</li>
          <li>Beverages and Snacks</li>
          <li>Convenient Home Delivery Options</li>
        </ul>
        <button
          className="w-button"
          type="button"
          onClick={() => navigate("/grocery-store")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
