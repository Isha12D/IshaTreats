const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-yellow-50 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <div className="text-2xl font-extrabold text-pink-500">
          𝓘𝓼𝓱𝓪 𝓣𝓻𝓮𝓪𝓽𝓼
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-pink-500 transition">
            Home
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            Sweets
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            About Us
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            Contact
          </a>
        </div>
        

        {/* Auth Actions */}
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg text-pink-500 border border-pink-400 hover:bg-pink-50 transition">
            Login
          </button>
          <button className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
