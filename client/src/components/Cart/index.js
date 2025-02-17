import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroceryContext } from "../../context/GroceryContext";

import { PayPalButtons } from "@paypal/react-paypal-js";
import "./index.css";

function Cart() {
  const { cart, removeCartItem, setCart } = useContext(GroceryContext);
  const navigate = useNavigate();

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2); 
  };

  const handleRemoveProduct = (id) => {
    removeCartItem(id);
  };


  const createOrder = async (data, actions) => {
    try {
      const order = await actions.order.create({
        purchase_units: [
          {
            amount: {
              value: calculateTotal(), 
            },
          },
        ],
      });
      return order; // Return the order ID
    } catch (error) {
      console.error("Error creating order:", error);
      throw error; 
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      handleOrderSuccess(details);
      // Additional logic after successful payment
    } catch (error) {
      handleError(error);
    }
  };

  const handleOrderSuccess = (details) => {
    setOrderId(details.id);
    setTotalAmount(calculateTotal()); 

    setOrderSuccess(true);
    setCart([]);
    alert("Payment Successful!");
    console.log("Order successful!", details);
  };

  const handleError = (err) => {
    console.error("PayPal Button Error:", err);
    alert("An error occurred while processing your payment. Please try again.");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout Page</h1>
      </div>
      {orderSuccess ? (
        <div className="order-confirmation">
          <div className="order-card">
            <h2>Thank you for your order!</h2>
            <p>Your order has been placed successfully.</p>
            <p>
              Order ID: <strong>{orderId}</strong>
            </p>
            <h3>Total Amount: ${totalAmount}</h3>
            <button
              onClick={() => navigate("/grocery-store")}
              className="c-button"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          {cart.length > 0 ? (
            <div>
              <ul className="cart-list">
                {cart.map((each) => (
                  <li key={each._id} className="cart-item">
                    <img src={each.imageUrl} alt={each.name} />
                    <div className="cart-card">
                      <div>
                        <p className="cart-item-name">{each.name}</p>
                        <p className="cart-item-price">${each.price}</p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveProduct(each._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <h2>Total: ${calculateTotal()}</h2>
                <div className="paypal-button-container">
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={handleError}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <div className="empty-card">
                <h1>No Cart Items</h1>
                <p>Your Cart is Empty</p>
                <button
                  type="button"
                  onClick={() => navigate("/grocery-store")}
                  className="c-button"
                >
                  Shop
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
