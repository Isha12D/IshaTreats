import { useState } from "react";

type SignupProps = {
  onSwitch: (email: string, password: string) => void;
  onClose: () => void;
};

const Signup = ({ onSwitch, onClose }: SignupProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (!res.ok) return;

      // 👉 switch to login with filled credentials
      onSwitch(email, password);

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
        Register Now
      </h2>

      <form className="mt-6 space-y-4" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <button
          onClick={() => onSwitch(email, password)}
          className="text-pink-500 font-semibold"
        >
          Login
        </button>
      </p>

      <button onClick={onClose} className="mt-4 w-full text-sm text-gray-400">
        Close
      </button>
    </div>
  );
};

export default Signup;
