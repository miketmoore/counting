const port = process.env.PORT || "3000";
export const apiBase =
  process.env.NODE_ENV === "development" ? `http://localhost:${port}` : "/api";
