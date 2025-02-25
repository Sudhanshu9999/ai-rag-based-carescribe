"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadNote } from "@/utils/api";
import ProtectedPage from "@/components/ProtectedPage";
import ProtectedNavBar from "@/components/Navbar";

const UploadPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    setLoading(true);
    setError(null);
    const newNote = await uploadNote(title, content);
    if (newNote) {
      router.push("/notes");
    } else {
      setError("Failed to upload note. Please try again.");
    }
    setLoading(false);
  };

  return (
    <ProtectedPage>
        <ProtectedNavBar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Medical Note</h1>
        {error && (
          <div className="mb-4 text-red-500 border border-red-500 rounded p-2">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Content</label>
          <textarea
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note content"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 font-semibold text-white rounded transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {loading ? "Uploading..." : "Upload Note"}
        </button>
      </div>
    </div>
    </ProtectedPage>
  );
};

export default UploadPage;
