# 📚 Google Books GraphQL App

## A Full-Stack Book Search & Reading List App with Apollo GraphQL & JWT Authentication

---

## 📖 About the Project
This project was originally a **RESTful MERN application** but has been converted into a **GraphQL-powered** full-stack app using **Apollo Server and Client**. Users can **search for books** using the Google Books API and **save them to their personal reading list**. Authentication is handled using **JWT (JSON Web Token) authentication** to ensure secure user access.


## Screenshots of Successful API function and login:
<img width="1440" alt="Screenshot 2025-03-12 at 8 23 14 PM" src="https://github.com/user-attachments/assets/fa4a4c33-6e12-4157-8239-a21c752eaefc" />
<img width="1121" alt="Screenshot 2025-03-12 at 8 24 00 PM" src="https://github.com/user-attachments/assets/7d6a26e6-9b56-442a-916c-43e47b9b3f32" />
<img width="1183" alt="Screenshot 2025-03-12 at 8 24 11 PM" src="https://github.com/user-attachments/assets/6cc2a39e-a683-4eaa-8bca-585510388760" />
-----

## 🛠️ Technologies Used
### **Frontend (React + Vite)**
- React with TypeScript
- Apollo Client (GraphQL)
- Vite for fast builds
- React Router for navigation
- TailwindCSS (if used for styling)

### **Backend (Node.js + Express + Apollo Server)**
- Express.js
- Apollo Server for GraphQL
- MongoDB + Mongoose
- JSON Web Token (JWT) for authentication
- bcrypt for password hashing
- CORS for secure cross-origin requests
- dotenv for managing environment variables

---

## 🌟 Features
✅ **Search for Books** - Integrated with Google Books API  
✅ **Save Books to a Personal Reading List**  
✅ **GraphQL API** - Fetch only the data needed efficiently  
✅ **Secure User Authentication** - JWT-based login and signup  
✅ **Fully Deployed on Render** - Backend & frontend live on Render  

---

## 🚀 Installation & Setup

1. **Clone the repository**  
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/mern-auth-graphql.git
   cd mern-auth-graphql
   ```

2. **Install dependencies**  
   ```sh
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the `server/` directory with:  
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   ```

   In the `client/` directory, add:  
   ```
   VITE_GRAPHQL_ENDPOINT=https://your-backend-url.onrender.com/graphql
   ```

4. **Run the development server**  
   - Backend: `npm run start` (from `/server`)
   - Frontend: `npm run dev` (from `/client`)

---

## 🌍 Live Demo
🔗 **Frontend:** [mern-auth-graphql.onrender.com](https://mern-auth-graphql.onrender.com)  
🔗 **Backend GraphQL Playground:** [mern-auth-graphql-backend.onrender.com/graphql](https://mern-auth-graphql-backend.onrender.com/graphql)  

---

## 💡 Lessons Learned
This project was a great learning experience transitioning from **REST to GraphQL**! Some key takeaways:
- **GraphQL improves efficiency** by allowing clients to request only the data they need.
- **Apollo Client & Server simplify GraphQL** with caching, query handling, and middleware.
- **JWT authentication in GraphQL** is different but works well with context in Apollo Server.
- **Deploying a full-stack app on Render** requires separate services for frontend & backend.

---

## 📌 Future Enhancements
🚀 Improve error handling with Apollo  
🚀 Add book categories and filters  
🚀 Implement a recommendation system  

---

### 📜 License
MIT License © 2025 Jennifer Thompson

JT-code-dev
