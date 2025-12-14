import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AdminDashboard from "./components/Admin/AdminDashboard";
import SweetSection from "./components/SweetSection";
import SnacksCarousel from "./components/SnackCarousel";
import CartPage from "./components/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <SweetSection/>
      <SnacksCarousel/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
