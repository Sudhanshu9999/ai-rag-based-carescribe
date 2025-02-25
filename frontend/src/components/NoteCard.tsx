"use client";

import React from "react";
import Link from "next/link";

type NoteCardProps = {
  id: string;
  title: string;
  summary: string;
  createdat: string;
};

const NoteCard: React.FC<NoteCardProps> = ({ id, title, summary, createdat }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition">
      <Link href={`/notes/${id}`}>
        <h2 className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline">
          {title}
        </h2>
      </Link>
      <p className="text-gray-700 text-sm mt-2">
        {summary.length > 100 ? summary.substring(0, 100) + "..." : summary}
      </p>
      <p className="text-gray-500 text-xs mt-1">
        Created on {new Date(createdat).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NoteCard;
