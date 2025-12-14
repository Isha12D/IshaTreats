import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "your_mongo_uri_here";

const createAdmin = async () => {
  await mongoose.connect(MONGO_URI);
  const passwordHash = await bcrypt.hash("aisha78@", 10);

  const admin = new User({
    name: "Aisha",
    email: "aisha78@gmail.com",
    password: passwordHash,
    role: "admin",
  });

  await admin.save();
  console.log("Admin created!");
  mongoose.disconnect();
};

createAdmin().catch(console.error);

//problem faced-->
//Initially, the admin user was manually inserted into MongoDB with a plain-text password, which caused login failures because bcrypt compares hashed passwords during authentication; to resolve this, a dedicated createAdmin script was created that connects to the database, hashes the admin password using bcrypt, and stores the user with the admin role, ensuring consistent authentication flow and correct role-based access to the admin dashboard.
