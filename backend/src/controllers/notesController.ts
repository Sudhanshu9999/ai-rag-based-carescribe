import { Request, Response } from "express";
import axios from "axios";
import pool from "../config/db";

// GET all notes for the authenticated user
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    // `req.user` is added by your requireAuth middleware
    const user = (req as any).user;
    const result = await pool.query(
      "SELECT * FROM notes WHERE userId = $1 ORDER BY createdAt DESC",
      [user.id]
    );
    res.json(result.rows);
  } catch (error: unknown) {
    console.error("Error fetching notes:", error);
    const errorMessage = error instanceof Error ? error.message : "Server error";
    res.status(500).json({ message: errorMessage });
  }
};

// GET a single note by ID for the authenticated user
export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const result = await pool.query(
      "SELECT * FROM notes WHERE id = $1 AND userId = $2",
      [id, user.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (error: unknown) {
    console.error("Error fetching note:", error);
    const errorMessage = error instanceof Error ? error.message : "Server error";
    res.status(500).json({ message: errorMessage });
  }
};

// CREATE a new note (with summarization) for the authenticated user
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required." });
      return;
    }
    const user = (req as any).user;

    const summarizationUrl = process.env.SUMMARIZATION_API_URL || "http://localhost:8000/api/summarize";
    const summarizationResponse = await axios.post(summarizationUrl, { text: content });
    const summary = summarizationResponse.data.summary;

    const result = await pool.query(
      "INSERT INTO notes (title, content, summary, createdAt, userId) VALUES ($1, $2, $3, NOW(), $4) RETURNING *",
      [title, content, summary, user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: unknown) {
    console.error("Error creating note:", error);
    const errorMessage = error instanceof Error ? error.message : "Server error";
    res.status(500).json({ message: errorMessage });
  }
};

// DELETE a note by ID for the authenticated user
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND userId = $2 RETURNING *",
      [id, user.id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Note not found or unauthorized" });
      return;
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting note:", error);
    const errorMessage = error instanceof Error ? error.message : "Server error";
    res.status(500).json({ message: errorMessage });
  }
};

// UPDATE Note
export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const user = (req as any).user; // Provided by requireAuth middleware
  
      if (!title || !content) {
        res.status(400).json({ message: "Title and content are required." });
        return;
      }
  
      // Call the FastAPI summarization service to generate an updated summary
      const summarizationUrl = process.env.SUMMARIZATION_API_URL || "http://localhost:8000/api/summarize";
      const summarizationResponse = await axios.post(summarizationUrl, { text: content });
      const summary = summarizationResponse.data.summary;
  
      // Update the note in the database for the authenticated user
      const result = await pool.query(
        "UPDATE notes SET title = $1, content = $2, summary = $3 WHERE id = $4 AND userid = $5 RETURNING *",
        [title, content, summary, id, user.id]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Note not found or unauthorized" });
        return;
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error: unknown) {
      console.error("Error updating note:", error);
      const errorMessage = error instanceof Error ? error.message : "Server error";
      res.status(500).json({ message: errorMessage });
    }
  };
