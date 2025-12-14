import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  onSwitch: () => void;
  onClose: () => void;
};

const Login = ({ onSwitch, onClose }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);

    if (!res.ok) return; // stop if login failed

    if (data.user?.role === "admin") {
      navigate("/admin");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("cartUpdated"));

      onClose(); // close modal
    }

  } catch (error) {
    alert("Something went wrong");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md bg-yellow-50 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Welcome Back
      </h2>

      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        New user?{" "}
        <button
          onClick={onSwitch}
          className="text-pink-500 font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>

      <button
        onClick={onClose}
        className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600"
      >
        Close
      </button>
    </div>
  );
};

export default Login;
