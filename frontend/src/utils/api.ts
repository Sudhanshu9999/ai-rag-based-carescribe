"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api";

export type Note = {
  id: string;
  title: string;
  summary: string;
  createdat: string;
  content?: string;
};

export const fetchNotes = async (): Promise<Note[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please log in.");
      }
      const response = await fetch(`${API_BASE_URL}/notes`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch notes: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching notes:", error);
      return [];
    }
  };
  

  export const fetchNoteById = async (id: string): Promise<Note | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please log in.");
      }
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch note: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching note:", error);
      return null;
    }
  };
  

  export const uploadNote = async (title: string, content: string): Promise<Note | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No JWT token found in localStorage.");
      }
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok)
        throw new Error(`Failed to upload note: ${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error uploading note:", error);
      return null;
    }
  };

  export const updateNote = async (id: string, title: string, content: string): Promise<Note | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please log in.");
      }
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) throw new Error(`Failed to update note: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error updating note:", error);
      return null;
    }
  };
  
  
  export const deleteNote = async (id: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No JWT token found in localStorage.");
      }
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      });
      if (!response.ok)
        throw new Error(`Failed to delete note: ${response.status} ${response.statusText}`);
      const data = await response.json();
      return data.message === "Note deleted successfully";
    } catch (error) {
      console.error("Error deleting note:", error);
      return false;
    }
  };
  

export default { fetchNotes, fetchNoteById, uploadNote, deleteNote };
