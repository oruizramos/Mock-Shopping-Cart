import express from "express";
import cors from "cors";
import productsRouter from "./routes/products";
import { initializeDb } from "./db/database";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(cors({
  origin: "https://mock-shopping-app.netlify.app/", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Root route - simple status message
app.get("/", (req, res) => {
  res.send("API is running");
});

// Products routes
app.use("/products", productsRouter);

// Start server only after DB is initialized
initializeDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}).catch((err: unknown) => {
  console.error("❌ Failed to initialize DB:", err);
});
