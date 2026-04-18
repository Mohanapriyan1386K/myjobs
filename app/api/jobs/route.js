import { NextResponse } from "next/server";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "Google" },
  { id: 2, title: "Backend Developer", company: "Amazon" },
  { id: 3, title: "Full Stack Developer", company: "Infosys" },
  { id: 4, title: "React Developer", company: "Meta" },
  { id: 5, title: "Node Developer", company: "Netflix" },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = 2;

  // 🔍 filter
  const filtered = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 pagination
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    data: paginated,
    total: filtered.length,
    page,
  });
}