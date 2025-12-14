import { useEffect, useState, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { getCartCount } from "../utils/cart";
import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import CartPage from "./CartPage";

const Navbar = () => {
  const [open, setOpen] = useState(false); // login/signup modal
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false); // cart modal
  const [userMenuOpen, setUserMenuOpen] = useState(false); // user dropdown

  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    const updateCart = () => setCartCount(getCartCount());
    updateCart(); // initial load
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  // Close user menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
                onClick={() => { setIsLogin(true); setOpen(true); }}
                className="px-4 py-2 rounded-lg text-pink-500 border border-pink-400 hover:bg-pink-50 transition"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 relative">

              {/* Cart Icon */}
              <button
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="w-6 h-6 text-pink-500" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              </button>

              {/* User Initial with dropdown */}
              <div ref={userMenuRef} className="relative">
                <div
                  onClick={() => setUserMenuOpen(prev => !prev)}
                  title="User Menu"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 text-white font-bold cursor-pointer"
                >
                  {initial}
                </div>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                    <button
                      onClick={() => { logout(); setUser(null); navigate("/"); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-pink-50 transition"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => alert("Settings clicked")} // dummy
                      className="w-full text-left px-4 py-2 hover:bg-pink-50 transition"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => alert("Profile clicked")} // dummy
                      className="w-full text-left px-4 py-2 hover:bg-pink-50 transition"
                    >
                      Profile
                    </button>
                  </div>
                )}
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
              onClose={() => { setOpen(false); setUser(getUser()); }}
            />
          ) : (
            <Signup
              onSwitch={() => setIsLogin(true)}
              onClose={() => { setOpen(false); setUser(getUser()); }}
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
            <CartPage />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
