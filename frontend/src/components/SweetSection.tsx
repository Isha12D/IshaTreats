import { useEffect, useState } from "react";
import axios from "axios";
import {
  addToCart,
  decreaseFromCart,
  getItemQuantity,
} from "../utils/cart";

type Sweet = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

const SweetSection = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  // 🔥 NEW: dummy state to force re-render on cart change
  const [, setCartVersion] = useState(0);

  const fetchSweets = async () => {
    try {
      const response = await axios.get<Sweet[]>(
        `${import.meta.env.VITE_API_URL}/sweets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;
      setSweets(data);

      // Extract unique categories
      const uniqueCategories: string[] = Array.from(
        new Set(data.map((s) => s.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch sweets", error);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // 🔥 NEW: listen to cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartVersion((v) => v + 1); // force re-render
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const filteredSweets = sweets.filter((s) => {
    const matchesName = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? s.category === category : true;
    const matchesPrice = maxPrice ? s.price <= Number(maxPrice) : true;
    return matchesName && matchesCategory && matchesPrice;
  });

  const visibleSweets = filteredSweets.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setLoadingMore(false);
    }, 1200);
  };

  const requireLogin = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.dispatchEvent(new Event("openLoginModal"));
      return false;
    }
    return true;
  };


  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">🍬 Our Sweets</h2>

      {/* SEARCH BAR */}
      <div className="flex gap-4 mb-8">
        <input
          placeholder="Search by name"
          className="border px-4 py-2 rounded"
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(6);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setVisibleCount(6);
          }}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          placeholder="Max Price"
          type="number"
          className="border px-4 py-2 rounded"
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setVisibleCount(6);
          }}
        />
      </div>

      {/* SWEETS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleSweets.map((sweet) => {
          const qty = getItemQuantity(sweet._id);

          return (
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
              <p className="text-sm text-gray-500">{sweet.category}</p>
              <p className="font-bold text-pink-600">₹{sweet.price}</p>

              {qty === 0 ? (
                <button
                  onClick={() => {
                    if (!requireLogin()) return;

                    addToCart({
                      _id: sweet._id,
                      name: sweet.name,
                      price: sweet.price,
                      image: sweet.image,
                    });
                  }}

                  className="mt-3 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="mt-3 flex items-center justify-between border rounded-lg px-3 py-2">
                  <button
                    onClick={() => decreaseFromCart(sweet._id)}
                    className="text-xl font-bold text-pink-500"
                  >
                    −
                  </button>
                  <span className="font-semibold">{qty}</span>
                  <button
                    onClick={() => {
                      if (!requireLogin()) return;

                      addToCart({
                        _id: sweet._id,
                        name: sweet.name,
                        price: sweet.price,
                        image: sweet.image,
                      });
                    }}

                    className="text-xl font-bold text-pink-500"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Skeletons */}
        {loadingMore &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 shadow animate-pulse"
            >
              <div className="h-40 w-full bg-gray-300 rounded mb-4"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-5 bg-pink-300 rounded w-1/4"></div>
            </div>
          ))}
      </div>

      {visibleCount < filteredSweets.length && !loadingMore && (
        <div className="mt-10 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Load More 🍬
          </button>
        </div>
      )}
    </div>
  );
};

export default SweetSection;
