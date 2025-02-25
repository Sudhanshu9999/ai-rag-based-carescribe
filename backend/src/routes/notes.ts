import express from "express";
import { getNotes, getNoteById, createNote, deleteNote, updateNote } from "../controllers/notesController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", requireAuth, getNotes); // Now protected
router.get("/:id", requireAuth, getNoteById); // Protected
router.post("/", requireAuth, createNote); // Protected
router.put("/:id", requireAuth, updateNote); 
router.delete("/:id", requireAuth, deleteNote); // Protected

export default router;
