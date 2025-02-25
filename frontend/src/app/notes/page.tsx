"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { fetchNotes } from "@/utils/api";
import ProtectedPage from "@/components/ProtectedPage";
import ProtectedNavBar from "@/components/Navbar";

type Note = {
  id: string;
  title: string;
  summary: string;
  createdat: string;
  content?: string;
};

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      const loadNotes = async () => {
        const data = await fetchNotes();
        setNotes(data);
        setFilteredNotes(data);
        setLoading(false);
      };
      loadNotes();
    }
  }, []);

  // Filter notes when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredNotes(notes);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerSearch) ||
          ((note.content || "").toLowerCase().includes(lowerSearch))
      );
      setFilteredNotes(filtered);
    }
  }, [searchTerm, notes]);

  return (
    <ProtectedPage>
      <ProtectedNavBar/>
      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
            Medical Notes
          </h1>
          <Link
            href="/upload"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 transition"
          >
            Create New Note
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-medium text-gray-600">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-500">
              No notes found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                  {note.title}
                </h2>
                <p className="text-gray-700 mb-2">{note.summary}</p>
                <p className="text-gray-500 text-sm mb-4">
                  {new Date(note.createdat).toLocaleString()}
                </p>
                <Link
                  href={`/notes/${note.id}`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedPage>
  );
};

export default NotesPage;
