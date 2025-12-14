# 🍬 Isha Treats – Sweet Shop Web Application

Isha Treats is a full-stack web application for an online sweet shop where users can browse sweets and snacks, add items to a cart, and place orders. The application also includes an admin dashboard for managing sweets and inventory.

The project focuses on clean UI, smooth user experience, secure authentication, cart handling using localStorage, and real-time stock updates from the database.

---

## ✨ Features

### 👤 User Features
- Browse sweets and snacks
- Add/remove items from cart
- Cart stored using **localStorage**
- Buy multiple sweets in one order
- Authentication (Login / Signup)
- Navbar with user profile dropdown
- Responsive UI using Tailwind CSS
- Responsive UI with loading indicators (loaders) for better user experience during data fetching and actions


### 🛠 Admin Features
- Admin dashboard access
- Manage sweets inventory
- Stock quantity automatically decreases after purchase
- Admin-only routing using a pre-seeded admin account

### 🔐 Admin Access

- This project includes a **pre-seeded admin account** for demonstration and evaluation purposes.

### Admin Credentials (Seeded)
- email: **aisha78@gmail.com**
- password: **aisha78@**


> ⚠️ **Note:**  
> These credentials are hardcoded/seeded only for academic and local testing purposes.  
> In a production environment, admin creation would be handled securely via role-based access control.

### Admin Capabilities
- Access the Admin Dashboard at: `/admin`
- Manage sweets inventory
- Update stock quantities
- View admin-only components

---

## 🧩 Tech Stack

### Frontend
- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**
- **Lucide Icons**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**

---

## 📂 Project Structure
```
root
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── Pages
│ │ ├── utils
│ │ ├── App.tsx
│ │ └── main.tsx
│ └── package.json
│
├── backend
│ ├── models
│ ├── routes
│ ├── middleware
│ ├── controllers
│ └── server.ts
│
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Isha12D/IshaTreats
cd isha-treats
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

- Create `.env` file
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

- Run Backend Server
```bash
npm run dev
```

- Backend will start at:
```
http://localhost:5000
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Frontend will run at:
```
http://localhost:5173
```
---

## 🛒 Cart & Order Flow

* Cart data is stored in localStorage
* Multiple sweets with different IDs can be purchased together
* On clicking Buy Now, the backend:
    * Validates Stock
    * Decrements quantity for each sweet
    * Completes purchase atomically

---

## 📸 Screenshots

---

## 🤖 My AI Usage
- AI Tools Used 
* ChatGPT (OpenAI)

- How I Used AI
    - To design and structure React components
    - To debug TypeScript and React Router issues
    - To design cart logic using localStorage
    - To implement backend logic for decrementing multiple sweet quantities
    - To refactor and clean up API logic
    - To improve UI/UX decisions (Navbar, modals, cart flow)

- Commit Message Style Note
    - Although standard documentation recommends commit messages like:
    `feat(auth): implement user login`
    - I intentionally did not strictly follow this commit style throughout development because:

        - Using certain AI-assisted commit tools was automatically adding an unknown collaborator to my GitHub repository

        - I wanted to maintain full control and privacy over my repository

        - Therefore, I used manual, descriptive commit messages instead

        - This decision was made consciously to ensure repository security and ownership clarity.


### Reflection on AI Impact
- AI significantly improved my development workflow by:
    - Reducing debugging time
    - Helping me understand best practices
    - Accelerating feature implementation
    - Improving code structure and readability

- However, all final decisions, logic, and implementations were fully understood and verified by me.

---

## 🔮 Future Improvements
- Payment gateway integration
- Order history page
- Admin analytics dashboard
- Better error handling & loaders

--- 

## 📜 License
- This project is for academic and learning purposes.

---

## 🌸 Final Note

I really enjoyed building this project, as it helped me strengthen my understanding of full-stack development, authentication flows, state management, and user experience design. Working on both the frontend and backend gave me valuable hands-on experience and confidence in building real-world applications.







