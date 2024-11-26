import { app } from "./app.js";
import Razorpay from "razorpay";
import cors from "cors";
import { connectDB } from "./config/database.js";

// Update CORS configuration to allow requests from port 3001
app.use(cors({
  origin: "3001"
}));

connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.get("/", (req, res) =>
  res.status(200).json({ message: "API is running" })
);

app.listen(3000, () =>
  console.log(`Server is working on ${process.env.PORT}`)
);