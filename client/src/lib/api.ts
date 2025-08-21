export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function generateAI(userInput: string) {
  const res = await fetch(`${API_BASE_URL}/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userInput }),
  });

  if (!res.ok) {
    throw new Error("Failed to call backend");
  }

  return res.json();
}
