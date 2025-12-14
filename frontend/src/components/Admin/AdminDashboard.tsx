import { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import sweet1 from "../../assets/sweet1.png";
import sweet2 from "../../assets/sweet2.png";
import sweet3 from "../../assets/sweet3.png";
import sweet4 from "../../assets/sweet4.png";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material";
import { SweetCategory } from "../../constants/sweetCategories";

/* ---------------- AXIOS SETUP ---------------- */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const AdminDashboard = () => {
  const [sweets, setSweets] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "", // new field
  });

  const [editId, setEditId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      const { data } = await api.get("/sweets");
      setSweets(data);
    } catch {
      console.error("Failed to fetch sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSubmit = async () => {
  if (!form.name || !form.category || !form.price || !form.quantity || !form.image) {
    alert("Please fill in all fields");
    return;
  }

  const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      image: form.image,
    };

    try {
      if (editId) {
        // 🔥 UPDATE
        await api.put(`/sweets/${editId}`, payload);
      } else {
        // 🔥 ADD
        await api.post("/sweets", payload);
      }

      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: "",
      });
      setEditId(null);
      fetchSweets();
    } catch {
      console.error("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
    } catch {
      console.error("Failed to delete sweet");
    }
  };

  /* Loader → Video switch */
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false)
    }, 2000);

    return () => clearTimeout(t);
  }, []);
  

  const handleRestock = async (id: string) => {
    const qty = prompt("Enter quantity to restock:");
    if (!qty) return;

    await api.post(`/sweets/${id}/restock`, {
      quantity: Number(qty),
    });

    fetchSweets();
  };

  if (loading) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 9999,
          }}
        >
          <div className="flex gap-4 mb-4">
            <img src={sweet1} className="sweet-loader delay-1" />
            <img src={sweet2} className="sweet-loader delay-2" />
            <img src={sweet3} className="sweet-loader delay-3" />
            <img src={sweet4} className="sweet-loader delay-4" />
          </div>

          <p className="text-orange-700 text-lg font-semibold tracking-wide animate-pulse">
            Let the world be bitter, we stay sweet 🍯
          </p>
        </div>
      );
    }



  return (
    <Paper sx={{ p: 4 }}>

      <h2>
        {editId ? "Edit Sweet" : "Add New Sweet"}
      </h2>


      {/* ADD SWEET FORM */}
      <div
          ref={formRef}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 20,
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: editId ? "#f5f7ff" : "transparent",
            border: editId ? "1px solid #c7d2fe" : "none",
          }}
        >

        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {/* <TextField
          label="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        /> */}
        <Select
          value={form.category}
          displayEmpty
          onChange={(e: SelectChangeEvent<string>) =>
            setForm({ ...form, category: e.target.value })
          }
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>

          {Object.values(SweetCategory).map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat.replace(/_/g, " ").toUpperCase()}
            </MenuItem>
          ))}
        </Select>


        <TextField
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <TextField
          label="Quantity"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <TextField
          label="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>
          {editId ? "Update Sweet" : "Add Sweet"}
        </Button>

      </div>

      {/* SWEETS TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sweets.map((sweet) => (
            <TableRow key={sweet._id}>
              <TableCell>
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  style={{ width: 50, height: 50, borderRadius: 8 }}
                />
              </TableCell>
              <TableCell>{sweet.name}</TableCell>
              <TableCell>{sweet.category}</TableCell>
              <TableCell>{sweet.price}</TableCell>
              <TableCell>{sweet.quantity}</TableCell>
              <TableCell>
                <Button
  size="small"
  onClick={() => {
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: String(sweet.price),
      quantity: String(sweet.quantity),
      image: sweet.image,
    });
    setEditId(sweet._id);

    // 🔥 Smooth scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }}
>
  Edit
</Button>


                {editId && (
                  <Button
                    color="error"
                    onClick={() => {
                      setForm({
                        name: "",
                        category: "",
                        price: "",
                        quantity: "",
                        image: "",
                      });
                      setEditId(null);
                    }}
                  >
                    Cancel Edit
                  </Button>
                )}
                <Button size="small" onClick={() => handleRestock(sweet._id)}>
                  Restock
                </Button>
                <Button color="error" onClick={() => handleDelete(sweet._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AdminDashboard;
