import express from "express";
import auth from "../middlewares/auth.js";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/dashboard.js";

const router = express.Router();

router.post("/items/", auth, createItem);
router.get("/items/", auth, getAllItems);
router.get("/items/:id", auth, getItemById);
router.put("/items/:id", auth, updateItem);
router.delete("/items/:id", auth, deleteItem);

export default router;
