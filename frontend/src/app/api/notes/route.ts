import { NextResponse } from "next/server";

const mockNotes = [
  { id: "1", title: "Patient Visit - John Doe", summary: "Flu symptoms. Prescribed rest.", createdAt: new Date().toISOString() },
  { id: "2", title: "Follow-up Checkup - Jane Smith", summary: "Recovered well. No infection.", createdAt: new Date().toISOString() },
];

// GET /api/notes
export async function GET() {
  return NextResponse.json(mockNotes);
}

// POST /api/notes
export async function POST(req: Request) {
  const { title, content } = await req.json();
  const newNote = {
    id: String(mockNotes.length + 1),
    title,
    summary: content.substring(0, 50) + "...", // Fake summarization
    createdAt: new Date().toISOString(),
  };
  mockNotes.push(newNote);
  return NextResponse.json(newNote, { status: 201 });
}
