import { useState, useEffect } from "react";
import { getCart, saveCart } from "../utils/cart";
import type { CartItem } from "../utils/cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleBuyNow = async () => {
    if (cartItems.length === 0) return alert("Cart is empty!");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/buy`,
        {
          items: cartItems.map((i) => ({ sweetId: i._id, quantity: i.quantity })),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Purchase successful!");
      saveCart([]); // clear cart
      setCartItems([]);
      navigate("/"); // redirect to home
    } catch (error: any) {
      alert(error.response?.data?.message || "Purchase failed");
    }
  };

  const handleIncrease = (item: CartItem) => {
    const updated = cartItems.map((c) =>
      c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
    );
    setCartItems(updated);
    saveCart(updated);
  };

  const handleDecrease = (item: CartItem) => {
    let updated = cartItems.map((c) =>
      c._id === item._id ? { ...c, quantity: c.quantity - 1 } : c
    );
    updated = updated.filter((c) => c.quantity > 0); // remove if 0
    setCartItems(updated);
    saveCart(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map((sweet) => (
            <div
              key={sweet._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={sweet.image}
                alt={sweet.name}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="mt-2 text-lg font-semibold">{sweet.name}</h3>
              <p className="font-bold text-pink-600">₹{sweet.price}</p>

              <div className="mt-3 flex items-center justify-between border rounded-lg px-3 py-2">
                <button
                  onClick={() => handleDecrease(sweet)}
                  className="text-xl font-bold text-pink-500"
                >
                  −
                </button>
                <span className="font-semibold">{sweet.quantity}</span>
                <button
                  onClick={() => handleIncrease(sweet)}
                  className="text-xl font-bold text-pink-500"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleBuyNow}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
