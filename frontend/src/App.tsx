import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AdminDashboard from "./components/Admin/AdminDashboard";
import SweetSection from "./components/SweetSection";
import SnacksCarousel from "./components/SnackCarousel";
import CartPage from "./components/CartPage";

function AppLayout() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      {/* 🔥 Show ONLY for normal users */}
      {!isAdminPage && (
        <>
          <SweetSection />
          <SnacksCarousel />
        </>
      )}

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
