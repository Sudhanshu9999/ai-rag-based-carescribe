"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchNoteById, updateNote, deleteNote } from "@/utils/api";

type Note = {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdat: string;
};

const NoteDetailPage: React.FC = () => {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const loadNote = async () => {
      const data = await fetchNoteById(id);
      if (data) {
        data.content = data.content ?? "";
        setNote(data as Note);
        setEditedTitle(data.title);
        setEditedContent(data.content);
      }
      setLoading(false);
    };
    loadNote();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;
    const success = await deleteNote(id);
    if (success) {
      router.push("/notes");
    } else {
      setError("Failed to delete the note.");
    }
  };

  const handleSave = async () => {
    if (!id) return;
    const updated = await updateNote(id, editedTitle, editedContent);
    if (updated) {
      updated.content = updated.content ?? "";
      setNote(updated as Note);
      setEditing(false);
    } else {
      setError("Failed to update the note.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header: Title and Action Buttons */}
      <div className="mb-8 flex flex-col sm:flex-row items-start justify-between">
        {editing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full sm:w-2/3 border border-gray-300 p-3 rounded text-4xl font-bold text-gray-800 mb-4 sm:mb-0"
          />
        ) : (
          <h1 className="text-4xl font-bold text-gray-800">{note.title}</h1>
        )}
        <div className="flex space-x-4 mt-4 sm:mt-0">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setEditedTitle(note.title);
                  setEditedContent(note.content);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Note Creation Date */}
      <p className="text-sm text-gray-500 mb-8">
        Created on {new Date(note.createdat).toLocaleString()}
      </p>

      {/* Note Content */}
      {editing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-64"
        ></textarea>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Original Note
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      )}

      {/* AI Summary Section */}
      <div className="bg-blue-50 shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          AI-Generated Summary
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {note.summary}
        </p>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Navigation Button */}
      <div className="flex justify-end">
        <Link
          href="/notes"
          className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Back to Notes
        </Link>
      </div>
    </div>
  );
};

export default NoteDetailPage;
