import React, { useContext, useEffect, useState } from "react";
import { GroceryContext } from "../../context/GroceryContext";

import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// category options
const categoryOptions = [
  { value: "all", label: "All" },
  { value: "fruits", label: "Fruits" },
  { value: "vegetables", label: "Vegetables" },
  { value: "meat", label: "Meat & Poultry" },
  { value: "seafood", label: "Seafood" },
  { value: "bakery", label: "Bakery" },
  { value: "dairy", label: "Dairy" },
];

function GroceryList() {
  const navigate = useNavigate();

  const [groceryData, setGroceryData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { addCartItem } = useContext(GroceryContext);

  const fetchGroceryDetails = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await axios.get("http://localhost:5003/api/products/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res);
      if (res.status === 200) {
        setGroceryData(res.data.grocery_items);
        setError(null);
      }
    } catch (error) {
      console.error(error);
      setError(
        "Your session has expired. Please log in again to access the grocery items."
      );
    }
  };

  useEffect(() => {
    fetchGroceryDetails();
  }, []);

  const handleAddToCart = (product) => {
    addCartItem(product);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filtered grocery items based on category 
  const filteredByCategory = groceryData.filter(
    (item) =>
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  // Filtered grocery items based on search query from the already filtered category items
  const filteredGroceryData = filteredByCategory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="grocery-header">
        <h1 className="title">GROCERY STORE</h1>
        <input
          type="text"
          placeholder="Search for items..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="category-filter">
          <label htmlFor="category-select">Filter by Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button className="checkout-button" onClick={() => navigate("/cart")}>
          CheckOut
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div>
        <ul className="un-list">
          {filteredGroceryData.map((eachItem) => (
            <li key={eachItem._id} className="list-item">
              <img
                src={eachItem.imageUrl}
                alt={eachItem.name}
                width="100"
                className="image"
              />
              <div className="card">
                <div>
                  <p className="grocery-name">{eachItem.name}</p>
                  <p className="grocery-price">${eachItem.price}</p>
                </div>
                <div className="button-container">
                  <button
                    type="button"
                    className="addToCartButton"
                    onClick={() => handleAddToCart(eachItem)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GroceryList;
