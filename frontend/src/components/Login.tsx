import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  email: string;
  password: string;
  onSwitch: () => void;
  onClose: () => void;
};

const Login = ({ email, password, onSwitch, onClose }: LoginProps) => {
  const [emailState, setEmailState] = useState(email);
  const [passwordState, setPasswordState] = useState(password);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 update when switching from signup
  useEffect(() => {
    setEmailState(email);
    setPasswordState(password);
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailState, password: passwordState }),
      });

      const data = await res.json();
      alert(data.message);

      if (!res.ok) return;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("userUpdated"));
      window.dispatchEvent(new Event("cartUpdated"));

      if (data.user?.role === "admin") navigate("/admin");

      onClose();

    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-yellow-50 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={emailState}
          onChange={(e) => setEmailState(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="password"
          value={passwordState}
          onChange={(e) => setPasswordState(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        New user?{" "}
        <button onClick={onSwitch} className="text-pink-500 font-semibold">
          Sign up
        </button>
      </p>

      <button onClick={onClose} className="mt-4 w-full text-sm text-gray-400">
        Close
      </button>
    </div>
  );
};

export default Login;
