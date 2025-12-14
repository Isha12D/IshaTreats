import { useEffect, useState } from "react";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
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
  baseURL: "http://localhost:5000/api",
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

  const handleAddSweet = async () => {
    if (!form.name || !form.category || !form.price || !form.quantity || !form.image) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await api.post("/sweets", {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
        image: form.image, // send image
      });

      setForm({ name: "", category: "", price: "", quantity: "", image: "" });
      fetchSweets();
    } catch {
      console.error("Failed to add sweet");
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

  return (
    <Paper sx={{ p: 4 }}>
      <h2>👑 Admin Dashboard – Manage Sweets</h2>

      {/* ADD SWEET FORM */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
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
        <Button variant="contained" onClick={handleAddSweet}>
          Add Sweet
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
