import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);

// NEW ROUTES
router.patch("/item/:id", protect, updateCartItem);
router.delete("/item/:id", protect, removeCartItem);

export default router;