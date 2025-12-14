import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { getCartCount } from "../utils/cart";
import { getUser, logout } from "../utils/auth";
import Login from "./Login";
import Signup from "./Signup";
import CartPage from "./CartPage"; // 🔥 import the cart page

const Navbar = () => {
  const [open, setOpen] = useState(false); // login/signup modal
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false); // 🔥 cart modal open

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    const updateCart = () => setCartCount(getCartCount());
    updateCart(); // initial load
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const initial = user?.name?.charAt(0).toUpperCase();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-yellow-50 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Brand */}
          <div className="text-2xl font-extrabold text-pink-500">𝓘𝓼𝓱𝓪 𝓣𝓻𝓮𝓪𝓽𝓼</div>

          {/* Links */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#" className="hover:text-pink-500 transition">Home</a>
            <a href="#" className="hover:text-pink-500 transition">Sweets</a>
            <a href="#" className="hover:text-pink-500 transition">About Us</a>
            <a href="#" className="hover:text-pink-500 transition">Contact</a>
          </div>

          {/* Auth Actions */}
          {!user ? (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-pink-500 border border-pink-400 hover:bg-pink-50 transition"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">

              {/* Cart Icon */}
              <button
                className="relative"
                onClick={() => setCartOpen(true)} // 🔥 open cart modal
              >
                <ShoppingCart className="w-6 h-6 text-pink-500" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              </button>

              {/* User Initial */}
              <div
                onClick={() => {
                  logout();
                  setUser(null);
                }}
                title="Logout"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 text-white font-bold cursor-pointer"
              >
                {initial}
              </div>

            </div>
          )}
        </div>
      </nav>

      {/* Login / Signup Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          {isLogin ? (
            <Login
              onSwitch={() => setIsLogin(false)}
              onClose={() => {
                setOpen(false);
                setUser(getUser()); // update navbar
              }}
            />
          ) : (
            <Signup
              onSwitch={() => setIsLogin(true)}
              onClose={() => {
                setOpen(false);
                setUser(getUser()); // update navbar
              }}
            />
          )}
        </div>
      )}

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-auto">
            <button
              onClick={() => setCartOpen(false)}
              className="mb-4 text-pink-500 font-bold"
            >
              Close
            </button>
            <CartPage /> {/* 🔥 embedded CartPage component */}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
